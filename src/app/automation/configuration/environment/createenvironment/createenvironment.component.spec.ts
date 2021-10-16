import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateenvironmentComponent } from './createenvironment.component';

describe('CreateenvironmentComponent', () => {
  let component: CreateenvironmentComponent;
  let fixture: ComponentFixture<CreateenvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateenvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateenvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
