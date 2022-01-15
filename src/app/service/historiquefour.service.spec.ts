import { TestBed } from '@angular/core/testing';

import { HistoriquefourService } from './historiquefour.service';

describe('HistoriquefourService', () => {
  let service: HistoriquefourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriquefourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
