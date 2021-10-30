import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UicontrolComponent } from './uicontrol.component';

describe('UicontrolComponent', () => {
  let component: UicontrolComponent;
  let fixture: ComponentFixture<UicontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UicontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UicontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
