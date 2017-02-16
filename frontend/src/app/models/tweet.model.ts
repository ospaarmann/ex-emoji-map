import { BaseModel } from './base.model';

export interface TweetInterface {

  coordinates:string;
  coordinates_array:Array<number>;
  text:string;
  emoji:string;
  screen_name:string;
  profile_image_url:string;

}

export class Tweet extends BaseModel implements TweetInterface {

  coordinates:string;
  coordinates_array:Array<number>;
  text:string;
  emoji:string;
  screen_name:string;
  profile_image_url:string;

  constructor(data?: any) {
    super(data);
    // Split coordinates. Note: Longitude first, then latitude.
    if(this.coordinates) {
      this.coordinates_array = this.coordinates.split(',').map(parseFloat);;
    }
  }
}
