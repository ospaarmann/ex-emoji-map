import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

import { MapService, PhoenixChannelService } from './services/index';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TopbarComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [MapService, PhoenixChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
