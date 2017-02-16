/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhoenixChannelService } from './phoenix-channel.service';

describe('PhoenixChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoenixChannelService]
    });
  });

  it('should ...', inject([PhoenixChannelService], (service: PhoenixChannelService) => {
    expect(service).toBeTruthy();
  }));
});
