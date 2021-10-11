import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcasecontrolComponent } from './testcasecontrol.component';

describe('TestcasecontrolComponent', () => {
  let component: TestcasecontrolComponent;
  let fixture: ComponentFixture<TestcasecontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcasecontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcasecontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
