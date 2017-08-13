import { TestBed, inject } from '@angular/core/testing';

import { VideoService } from './video.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


describe('VideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoService, Http]
    });
  });

  it('should ...', inject([VideoService], (service: VideoService) => {
    expect(service).toBeTruthy();
  }));
});
