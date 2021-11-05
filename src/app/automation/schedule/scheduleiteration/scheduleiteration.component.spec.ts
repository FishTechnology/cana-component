import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleIterationComponent } from './scheduleiteration.component';

describe('ScheduleiterationComponent', () => {
  let component: ScheduleIterationComponent;
  let fixture: ComponentFixture<ScheduleIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleIterationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
