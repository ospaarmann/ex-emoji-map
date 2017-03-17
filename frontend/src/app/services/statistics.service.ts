import { Injectable } from '@angular/core';

import { Tweet } from '../models/tweet.model';

function compare(a,b) {
  if (a['count'] > b['count'])
    return -1;
  if (a['count'] < b['count'])
    return 1;
  return 0;
}

@Injectable()
export class StatisticsService {

  totalCount:number;
  emojiStats:Array<Object>;

  constructor() {
    this.totalCount = 0;
    this.emojiStats = [];
  }

  addTweet(tweet:Tweet):void {
    this.totalCount += 1;
    // either update the counter for the emoji or add emoji to statistics array
    if(this.emojiStats.length > 0 && this.emojiStats.find(x => (x['emoji'] !== null && x['emoji'] === tweet['emoji']))) {
      this.emojiStats.find(x => x['emoji'] === tweet.emoji)['count'] = this.emojiStats.find(x => x['emoji'] === tweet.emoji)['count'] + 1;
    } else {
      this.emojiStats.push({emoji: tweet.emoji, count: 1});
    }
  }

  getStats():Array<Object> {
    this.emojiStats.sort(compare);
    return this.emojiStats;
  }

}
