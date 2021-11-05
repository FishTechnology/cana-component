import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ScheduleIterationModel } from '../models/ScheduleIterationModel';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-scheduleiteration',
  templateUrl: './scheduleiteration.component.html',
  styleUrls: ['./scheduleiteration.component.scss'],
})
export class ScheduleIterationComponent implements OnInit {
  displayedColumns: string[] = ['startedon', 'completedOn', 'status', 'view'];
  dataSource = new MatTableDataSource<ScheduleIterationModel>();

  scheduleIterations!: ScheduleIterationModel[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { scheduleId: number },
    private _bottomSheetRef: MatBottomSheetRef<ScheduleIterationComponent>,
    private scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.getScheduleIterationsBySchId();
  }

  ngOnInit(): void {}

  getScheduleIterationsBySchId(): void {
    this.scheduleService
      .getScheduleIterationByScheduleId(this.data.scheduleId)
      .subscribe(
        (res) => {
          this.scheduleIterations = res;
          this.dataSource.data = res;
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while loading schedule iteration'
          );
        }
      );
  }

  navigateToHistory(scheduleIterationId: number): void {
    this._bottomSheetRef.dismiss();
    this.route.navigate([
      '/schedules',
      this.data.scheduleId,
      'scheduleiterations',
      scheduleIterationId,
      'histories',
    ]);
  }
}
