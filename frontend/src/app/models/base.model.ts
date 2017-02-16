/*
*  Base Data Model class from which the other models exten / inherit
*/

import * as _ from 'lodash';

export class BaseModel {

  public id: string;
  [key: string]: any;

  constructor(private data?: any) {
    if (data) {
      if(_.size(data.attributes) > 0) {
        _.extend(this, data.attributes);
      }
      delete this.data;
    }
  }
}
