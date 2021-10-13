import { TestBed } from '@angular/core/testing';

import { GlobalvariableService } from './globalvariable.service';

describe('GlobalvariableService', () => {
  let service: GlobalvariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalvariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
