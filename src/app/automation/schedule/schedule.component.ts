import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ReScheduleStatusModel } from './models/ReScheduleStatusModel';
import { ScheduleItemModel } from './models/ScheduleItemModel';
import { ScheduleIterationModel } from './models/ScheduleIterationModel';
import { ScheduleModel } from './models/ScheduleModel';
import { UpdateScheduleStatusModel } from './models/UpdateScheduleStatusModel';
import { ScheduleService } from './schedule.service';
import { ScheduleIterationComponent } from './scheduleiteration/scheduleiteration.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<ScheduleItemModel>();
  customerDetail!: CustomerDetail;
  scheduleDetail!: ScheduleModel[];
  scheduleModel!: ScheduleModel;
  selection = new SelectionModel<ScheduleItemModel>(true, []);
  displayedColumns: string[] = [
    'select',
    'testplan',
    'environment',
    'status',
    'lastexecute',
    'action',
  ];
  scheduleIterations!: ScheduleIterationModel[];

  constructor(
    public scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private customerService: CustomerService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getScheduleByAppId();
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  getScheduleByAppId(): void {
    this.scheduleService
      .getScheduleByAppId(
        this.customerDetail.applicationId,
        this.customerDetail.userId
      )
      .subscribe(
        (res) => {
          this.scheduleModel = res;
          this.dataSource.data = res.scheduleItem;
          this.selection = new SelectionModel<ScheduleItemModel>(true, []);
        },
        (err) => {
          this.snackbarService.openSnackBar('error while loading schedule');
        }
      );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ScheduleModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //   row.position + 1
    // }`;
    return '';
  }

  getScheduleIterationBySchId() {
    this.scheduleService
      .getScheduleIterationByScheduleId(
        this.customerDetail.applicationId,
        this.selection.selected[0].scheduleId
      )
      .subscribe(
        (res) => {
          this.scheduleIterations = res;
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while loading schedule iterations'
          );
        }
      );
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ScheduleIterationComponent, {
      data: {
        scheduleId: this.selection.selected[0].scheduleId,
      },
      panelClass: 'bottom-sheet-cus-width',
    });
  }

  reSchedule(): void {
    let reScheduleStatusModel: ReScheduleStatusModel = {
      userId: this.customerDetail.userId,
    };
    this.scheduleService
      .reSchedule(
        this.customerDetail.applicationId,
        this.selection.selected[0].scheduleId,
        reScheduleStatusModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully reschedule status');
          this.getScheduleByAppId();
        },
        (err) => {
          this.snackbarService.openSnackBar('error while reschedule ');
        }
      );
  }

  updateScheduleStatus(scheduleStatus: string): void {
    let updateScheduleStatusModel: UpdateScheduleStatusModel = {
      status: scheduleStatus,
    };
    this.scheduleService
      .updateScheduleStatus(
        this.customerDetail.applicationId,
        this.selection.selected[0].scheduleId,
        updateScheduleStatusModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully updated status');
          this.getScheduleByAppId();
        },
        (err) => {
          this.snackbarService.openSnackBar('error while update status');
        }
      );
  }

  refresh(): void {
    this.getScheduleByAppId();
  }
}
