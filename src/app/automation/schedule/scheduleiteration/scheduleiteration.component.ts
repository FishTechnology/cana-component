import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
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
  customerDetail!: CustomerDetail;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { scheduleId: string },
    private _bottomSheetRef: MatBottomSheetRef<ScheduleIterationComponent>,
    public scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private router: ActivatedRoute,
    private route: Router,
    private customerService: CustomerService
  ) {
    this.customerService.getUserDetail().subscribe({
      next: (res) => {
        this.customerDetail = res;
        this.getScheduleIterationsBySchId();
      },
    });
  }

  ngOnInit(): void {}

  getScheduleIterationsBySchId(): void {
    this.scheduleService
      .getScheduleIterationByScheduleId(
        this.customerDetail.applicationId,
        this.data.scheduleId
      )
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
