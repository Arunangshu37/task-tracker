import { TestBed } from '@angular/core/testing';

import { MarkerApiService } from './marker-api.service';

describe('MarkerApiService', () => {
  let service: MarkerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
