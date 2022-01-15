import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestcaseComponent } from './add-testcase.component';

describe('AddTestcaseComponent', () => {
  let component: AddTestcaseComponent;
  let fixture: ComponentFixture<AddTestcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
