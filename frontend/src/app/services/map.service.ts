import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Tweet } from '../models/tweet.model';

/*
need to explicitly import * for untyped modules import * as mapboxgl from 'mapbox-gl.js';
*/
declare let mapboxgl: any;

@Injectable()
export class MapService {

  map:any;
  markerArray:Array<any>;
  maxMarkers:number;

  constructor() {
    // To keep track of all markers and remove when maxMarkers is reached
    this.markerArray = [];
    // Set maximum number of markers (emojis) to prevent crashing the map
    this.maxMarkers = 700;
  }

  initMap() {
    mapboxgl.accessToken = environment.mapbox_access_token;
    this.map = new mapboxgl.Map({
        container: 'map',
        center: [13.4, 52.52],
        zoom: 1,
        style: environment.mapbox_style_url
    });
    let nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');
  }

  addTweet(tweet:Tweet):any {

    let el = document.createElement('div');
    el.className = 'emoji';
    let newContent = document.createTextNode(tweet.emoji);
    el.appendChild(newContent); //add the text node to the newly created div.

    // Handle Popup
    let textWithLinks = this.urlify(tweet.text);
    let popup_content = '<a href="http://twitter.com/' + tweet.screen_name +
    '" target="_blank"><img class="profile_pic" src="' + tweet.profile_image_url + '"></a>' +
    '<a href="http://twitter.com/' + tweet.screen_name +
    '" target="_blank" class="screen_name">@' + tweet.screen_name + '</a>: ' +
    textWithLinks;
    let popup = new mapboxgl.Popup({offset: 25})
    .setHTML(popup_content);

    // add marker to map
    let marker = new mapboxgl.Marker(el, {offset: [-10, -10]})
        .setLngLat(tweet.coordinates_array)
        .setPopup(popup)
        .addTo(this.map);

    if(this.markerArray.push(marker) > this.maxMarkers) {
      console.log("Maximum number of markers reached");
      // we have one to many
      this.markerArray.shift().remove();
    }
  }

  urlify(text:string):string {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
  }

}
