import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

/*
need to explicitly import * for untyped modules import * as mapboxgl from 'mapbox-gl.js';
*/
declare var mapboxgl: any;

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox_access_token;
    var map = new mapboxgl.Map({
        container: 'map',
        center: [13.4, 52.52],
        zoom: 2,
        style: environment.mapbox_style_url
    });
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    this.addMarker(map);
  }

  addMarker(map:any):any {
    var el = document.createElement('div');
    el.className = 'emoji';
    var newContent = document.createTextNode('😘');
    el.appendChild(newContent); //add the text node to the newly created div.

    // add marker to map
    new mapboxgl.Marker(el, {offset: [-10, -10]})
        .setLngLat([13.4,52.52])
        .addTo(map);
  }

}
