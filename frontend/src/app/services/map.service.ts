import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
    this.addMarker();
  }

  addMarker():any {
    var el = document.createElement('div');
    el.className = 'emoji';
    var newContent = document.createTextNode('😘');
    el.appendChild(newContent); //add the text node to the newly created div.

    // add marker to map
    new mapboxgl.Marker(el, {offset: [-10, -10]})
        .setLngLat([13.4,52.52])
        .addTo(this.map);
  }

}
