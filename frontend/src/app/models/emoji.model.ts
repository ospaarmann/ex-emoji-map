import { BaseModel } from './base.model';

export interface EmojiInterface {

  coordinates:string;
  coordinates_array:Array<number>;
  text:string;
  emoji:string;
  screen_name:string;

}

export class Emoji extends BaseModel implements EmojiInterface {

  coordinates:string;
  coordinates_array:Array<number>;
  text:string;
  emoji:string;
  screen_name:string;

  constructor(data?: any) {
    super(data);
    // Split coordinates. Note: Longitude first, then latitude.
    if(this.coordinates) {
      this.coordinates_array = this.coordinates.split(',').map(parseFloat);;
    }
  }
}
