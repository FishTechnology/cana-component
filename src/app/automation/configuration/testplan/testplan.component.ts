import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { TestplanService } from './testplan.service';
import { GlobalVariableModel } from '../globalvariable/models/GlobalVariableModel';
import { CreateTestplanComponent } from './createtestplan/createtestplan.component';
import { ScheduleComponent } from '../../schedule/schedule.component';
import { TestPlanModel } from './models/TestPlanModel';
import { CreateTestcaseComponent } from '../testcase/createtestcase/createtestcase.component';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { UpdateTestplanStatusModel } from './models/UpdateTestplanStatusModel';

@Component({
  selector: 'app-testplan',
  templateUrl: './testplan.component.html',
  styleUrls: ['./testplan.component.scss'],
})
export class TestplanComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'status', 'createdon'];
  dataSource = new MatTableDataSource<TestPlanModel>();
  selection = new SelectionModel<TestPlanModel>(true, []);
  moment = moment;
  customerDetail!: CustomerDetail;
  globalVariableModels!: GlobalVariableModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isShowDeleteBtn: boolean = false;
  constructor(
    public dialog: MatDialog,
    private testplanService: TestplanService,
    public customerService: CustomerService,
    private snackbarService: SnackbarService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getTestplanByUserId();
    });
  }

  ngOnInit(): void {}

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
  checkboxLabel(row?: TestPlanModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //  // row.key + 1
    // }`;
    return '';
  }

  createTestPlan() {
    var modelRef = this.dialog.open(CreateTestplanComponent, {
      data: {
        customerDetail: this.customerDetail,
      },
    });
    modelRef.componentInstance.testPlanEvent.subscribe((event) => {
      this.getTestplanByUserId();
    });
  }

  createTestCase(): void {
    if (this.selection.selected.length !== 1) {
      this.snackbarService.openSnackBar('please select one test plan');
      return;
    }

    this.dialog.open(CreateTestcaseComponent, {
      data: {
        customerDetail: this.customerDetail,
        testPlanId: this.selection.selected[0].id,
      },
    });
  }

  refresh() {
    this.getTestplanByUserId();
  }

  deleteTestPlan() {
    this.testplanService
      .deleteTestPlanById(this.selection.selected[0].id)
      .subscribe((res) => {
        this.snackbarService.openSnackBar(
          'successfully delete global variables'
        );
        this.getTestplanByUserId();
      });
  }

  updateTestPlan() {
    var modelRef = this.dialog.open(CreateTestplanComponent, {
      data: {
        customerDetail: this.customerDetail,
        testPlanId: this.selection.selected[0].id,
      },
    });
    modelRef.componentInstance.testPlanEvent.subscribe((event) => {
      this.getTestplanByUserId();
    });
  }

  getTestplanByUserId(): void {
    this.testplanService
      .getTestPlansByUserId(this.customerDetail.userId)
      .subscribe(
        (res) => {
          this.dataSource.data = res;
          this.selection = new SelectionModel<TestPlanModel>(true, []);
        },
        (error) => {
          this.snackbarService.openSnackBar('error in loading test plan');
        }
      );
  }

  updateTestPlanStatus(status: string): void {
    let updateTestplanStatusModel: UpdateTestplanStatusModel = {
      userId: this.customerDetail.userId,
      status: status,
    };
    this.testplanService
      .updateTestPlanStatus(
        this.selection.selected[0].id,
        updateTestplanStatusModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfully updated test plan status'
          );
          this.getTestplanByUserId();
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while updating test plan status'
          );
        }
      );
  }
}
