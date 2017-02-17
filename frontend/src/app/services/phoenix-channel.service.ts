import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as Phoenix from 'phoenix';

import { MapService } from './map.service';
import { Tweet } from '../models/tweet.model';

@Injectable()
export class PhoenixChannelService {

  socket:any;
  channel:any;

  constructor(private mapService:MapService) { }

  connect() {
    this.socket = new Phoenix.Socket(environment.socket_endpoint + '/map_socket', {
      //logger: (kind, msg, data) => { console.log('%s: %s', kind, msg, data) }
    });

    this.socket.connect();

    this.channel = this.socket.channel('map:updates');
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) });
    this.channel.onError(e => console.log('something went wrong', e));
    this.channel.onClose(e => console.log('channel closed', e));

    this.channel.on('new:msg', msg => {
      let tweet = new Tweet(msg);
      // Draw it on the map
      this.mapService.addTweet(tweet);
    });
  }

}
