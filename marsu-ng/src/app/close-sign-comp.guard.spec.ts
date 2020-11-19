import { TestBed } from '@angular/core/testing';

import { CloseSignCompGuard } from './close-sign-comp.guard';

describe('CloseSignCompGuard', () => {
  let guard: CloseSignCompGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CloseSignCompGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
