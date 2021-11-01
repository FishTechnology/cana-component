import { TestBed } from '@angular/core/testing';

import { UicontrolService } from './uicontrol.service';

describe('UicontrolService', () => {
  let service: UicontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UicontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
