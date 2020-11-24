import { TestBed } from '@angular/core/testing';

import { MarsuService } from './marsu.service';

describe('MarsuService', () => {
  let service: MarsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
