import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetestcaseComponent } from './createtestcase.component';

describe('CreatetestcaseComponent', () => {
  let component: CreatetestcaseComponent;
  let fixture: ComponentFixture<CreatetestcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
