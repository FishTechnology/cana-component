import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentvariableComponent } from './environmentvariable.component';

describe('EnvironmentvariableComponent', () => {
  let component: EnvironmentvariableComponent;
  let fixture: ComponentFixture<EnvironmentvariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentvariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentvariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
