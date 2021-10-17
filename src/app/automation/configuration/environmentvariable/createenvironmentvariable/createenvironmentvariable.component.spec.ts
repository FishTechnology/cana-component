import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateenvironmentvariableComponent } from './createenvironmentvariable.component';

describe('CreateenvironmentvariableComponent', () => {
  let component: CreateenvironmentvariableComponent;
  let fixture: ComponentFixture<CreateenvironmentvariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateenvironmentvariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateenvironmentvariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
