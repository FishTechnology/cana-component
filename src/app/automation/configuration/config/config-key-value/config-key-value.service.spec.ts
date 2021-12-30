import { TestBed } from '@angular/core/testing';

import { ConfigKeyValueService } from './config-key-value.service';

describe('ConfigKeyValueService', () => {
  let service: ConfigKeyValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigKeyValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
