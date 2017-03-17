import { Component,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { StatisticsService } from '../services/index';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  emojiStats:Array<Object>;

  constructor(private statisticsService:StatisticsService) {
    this.emojiStats = [];
  }

  ngOnInit() {
    Observable.interval(5000).subscribe(() => this.renderStats());
  }

  renderStats():void {
    this.emojiStats = this.statisticsService.getStats();
  }

}
