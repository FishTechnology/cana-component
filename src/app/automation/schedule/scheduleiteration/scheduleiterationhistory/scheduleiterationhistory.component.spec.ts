import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleIterationHistoryComponent } from './scheduleiterationhistory.component';

describe('ScheduleiterationhistoryComponent', () => {
  let component: ScheduleIterationHistoryComponent;
  let fixture: ComponentFixture<ScheduleIterationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleIterationHistoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleIterationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
