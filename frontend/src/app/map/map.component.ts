import { Component, OnInit } from '@angular/core';

import { MapService, PhoenixChannelService } from '../services/index';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService:MapService,
    private phoenixChannelService:PhoenixChannelService) { }

  ngOnInit() {
    this.mapService.initMap();
    this.phoenixChannelService.connect();
  }

}
