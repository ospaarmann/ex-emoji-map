import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as Phoenix from 'phoenix';

import { MapService } from './map.service';
import { StatisticsService } from './statistics.service';
import { Tweet } from '../models/tweet.model';

@Injectable()
export class PhoenixChannelService {

  public socket:any;
  public channel:any;
  public alerts:Array<any>;

  constructor(private mapService:MapService, private statisticsService:StatisticsService) {
    this.alerts = [];
  }

  connect():void {
    this.socket = new Phoenix.Socket(environment.socket_endpoint + '/map_socket', {
      //logger: (kind, msg, data) => { console.log('%s: %s', kind, msg, data) }
    });

    this.socket.connect();

    this.channel = this.socket.channel('map:updates');
    this.channel.join()
      .receive("ok", resp => {
        this.displaySuccess("Joined channel successfully");
        console.log("Joined successfully", resp)
      })
      .receive("error", resp => {
        this.displayError('Error joining channel.');
        console.log("Unable to join", resp);
      });
    this.channel.onError(e => {
      this.displayError('Error joining channel.');
      console.log('something went wrong', e);
    });
    this.channel.onClose(e => {
      this.displayError('Channel closed.');
      console.log('channel closed', e)
    });

    this.channel.on('new:msg', msg => {
      let tweet = new Tweet(msg);
      // Draw it on the map
      this.mapService.addTweet(tweet);
      this.statisticsService.addTweet(tweet);
    });
  }

  displayError(msg:string):void {
    this.alerts = [{
      type: 'danger',
      msg: msg
    }];
  }

  displaySuccess(msg:string):void {
    this.alerts = [{
      type: 'success',
      msg: msg
    }];
  }

}
