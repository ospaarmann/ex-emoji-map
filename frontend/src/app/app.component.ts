import { Component, OnInit } from '@angular/core';

import { MapService, PhoenixChannelService } from './services/index';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private mapService:MapService,
    private phoenixChannelService:PhoenixChannelService) {}

  ngOnInit() {
    this.mapService.initMap();
    this.phoenixChannelService.connect();
  }

}
