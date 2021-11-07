import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtlOptionsAutocompleteComponent } from './ctloptionsautocomplete.component';

describe('CtloptionsautocompleteComponent', () => {
  let component: CtlOptionsAutocompleteComponent;
  let fixture: ComponentFixture<CtlOptionsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtlOptionsAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtlOptionsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
