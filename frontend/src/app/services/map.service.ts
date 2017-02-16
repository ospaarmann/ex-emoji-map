import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Tweet } from '../models/tweet.model';

/*
need to explicitly import * for untyped modules import * as mapboxgl from 'mapbox-gl.js';
*/
declare var mapboxgl: any;

@Injectable()
export class MapService {

  map:any;

  constructor() {}

  initMap() {
    mapboxgl.accessToken = environment.mapbox_access_token;
    this.map = new mapboxgl.Map({
        container: 'map',
        center: [13.4, 52.52],
        zoom: 1,
        style: environment.mapbox_style_url
    });
    var nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');
  }

  addTweet(tweet:Tweet):any {

    var el = document.createElement('div');
    el.className = 'emoji';
    var newContent = document.createTextNode(tweet.emoji);
    el.appendChild(newContent); //add the text node to the newly created div.

    // Handle Popup
    var textWithLinks = this.urlify(tweet.text);
    var popup_content = '<a href="http://twitter.com/' + tweet.screen_name +
    '" target="_blank"><img class="profile_pic" src="' + tweet.profile_image_url + '"></a>' +
    '<a href="http://twitter.com/' + tweet.screen_name +
    '" target="_blank" class="screen_name">@' + tweet.screen_name + '</a>: ' +
    textWithLinks;
    var popup = new mapboxgl.Popup({offset: 25})
    .setHTML(popup_content);

    // add marker to map
    new mapboxgl.Marker(el, {offset: [-10, -10]})
        .setLngLat(tweet.coordinates_array)
        .setPopup(popup)
        .addTo(this.map);
  }

  urlify(text:string):string {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
  }

}
