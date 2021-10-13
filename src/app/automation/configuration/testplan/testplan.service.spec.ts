import { TestBed } from '@angular/core/testing';

import { TestplanService } from './testplan.service';

describe('TestplanService', () => {
  let service: TestplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
