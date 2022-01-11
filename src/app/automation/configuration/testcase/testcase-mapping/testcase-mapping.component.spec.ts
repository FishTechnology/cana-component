import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseMappingComponent } from './testcase-mapping.component';

describe('TestcaseMappingComponent', () => {
  let component: TestcaseMappingComponent;
  let fixture: ComponentFixture<TestcaseMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestcaseMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcaseMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
