import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestplanComponent } from './testplan.component';

describe('TestplanComponent', () => {
  let component: TestplanComponent;
  let fixture: ComponentFixture<TestplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
