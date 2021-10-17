import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactionComponent } from './createaction.component';

describe('CreateactionComponent', () => {
  let component: CreateactionComponent;
  let fixture: ComponentFixture<CreateactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
