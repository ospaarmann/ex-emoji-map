/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticsService]
    });
  });

  it('should ...', inject([StatisticsService], (service: StatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
