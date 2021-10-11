import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalvariableComponent } from './globalvariable.component';

describe('GlobalvariableComponent', () => {
  let component: GlobalvariableComponent;
  let fixture: ComponentFixture<GlobalvariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalvariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalvariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
