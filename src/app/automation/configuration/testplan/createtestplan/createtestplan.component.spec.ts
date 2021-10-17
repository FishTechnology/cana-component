import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetestplanComponent } from './createtestplan.component';

describe('CreatetestplanComponent', () => {
  let component: CreatetestplanComponent;
  let fixture: ComponentFixture<CreatetestplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetestplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetestplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
