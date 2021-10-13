import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateglobalvariableComponent } from './createglobalvariable.component';

describe('CreateglobalvariableComponent', () => {
  let component: CreateglobalvariableComponent;
  let fixture: ComponentFixture<CreateglobalvariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateglobalvariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateglobalvariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
