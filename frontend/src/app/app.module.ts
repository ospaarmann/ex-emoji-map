import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { MapService, PhoenixChannelService, StatisticsService } from './services/index';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DescriptionComponent } from './description/description.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TopbarComponent,
    DescriptionComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [MapService, PhoenixChannelService, StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
