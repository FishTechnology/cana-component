import { TestBed } from '@angular/core/testing';

import { TestcasecontrolService } from './testcasecontrol.service';

describe('TestcasecontrolService', () => {
  let service: TestcasecontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestcasecontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
