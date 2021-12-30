import { TestBed } from '@angular/core/testing';

import { EnvironmentvariableService } from './environmentvariable.service';

describe('EnvironmentvariableService', () => {
  let service: EnvironmentvariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentvariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
