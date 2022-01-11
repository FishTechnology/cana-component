import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { CreateTestcaseComponent } from './createtestcase/createtestcase.component';
import { TestCaseModel } from './models/TestCaseModel';
import { TestCaseService } from './testcase.service';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss'],
})
export class TestcaseComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'createdon', 'comments'];
  dataSource = new MatTableDataSource<TestCaseModel>();
  selection = new SelectionModel<TestCaseModel>(true, []);
  moment = moment;
  customerDetail!: CustomerDetail;
  testcaseModels!: TestCaseModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  testPlanId!: string;
  constructor(
    public dialog: MatDialog,
    public testcaseService: TestCaseService,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.route.params.subscribe((params) => {
      this.testPlanId = params['testplanid'];
    });

    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getTestCases();
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
  checkboxLabel(row?: TestCaseModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //  // row.key + 1
    // }`;
    return '';
  }

  createTestCase() {
    var modelRef = this.dialog.open(CreateTestcaseComponent, {
      data: {
        customerDetail: this.customerDetail,
        testPlanId: this.testPlanId,
      },
    });
    modelRef.componentInstance.testCaseEvent.subscribe((res) => {
      this.getTestCaseByUserId();
    });
  }

  navigateAddNewAction(): void {
    let url = `/configuration`;
    if (this.testPlanId) {
      url = `/configuration/testplans/${this.testPlanId}`;
    }

    url += `/testcases/${this.selection.selected[0].id}/actions/create`;
    this.router.navigate([url]);
  }

  navigateViewAction(): void {
    let url = `/configuration`;
    if (this.testPlanId) {
      url = `/configuration/testplans/${this.testPlanId}`;
    }

    url += `/testcases/${this.selection.selected[0].id}/actions`;
    this.router.navigate([url]);
  }

  navigateViewEnv(): void {
    let url = `/configuration/environments/${this.selection.selected[0].id}/`;

    url = `/configuration/testplans/${this.testPlanId}`;

    url += `/testcases/${this.selection.selected[0].id}/actions`;
    this.router.navigate([url]);
  }

  navigateAddNewEnv(): void {}

  refresh() {
    this.getTestCases();
  }

  delete() {
    // const globalVariableId = 10;
    // const userId = 10;
    // this.testcaseService
    //   .deleteGlobalVariable(globalVariableId, userId)
    //   .subscribe((res) => {
    //     this.openSnackBar('successfully delete global variables');
    //   });
  }

  edit() {
    var modelRef = this.dialog.open(CreateTestcaseComponent, {
      data: {
        customerDetail: this.customerDetail,
        testPlanId: this.testPlanId,
        testCaseId: this.selection.selected[0].id,
      },
    });
    modelRef.componentInstance.testCaseEvent.subscribe((res) => {
      this.getTestCaseByUserId();
    });
  }

  getTestCases(): void {
    if (this.testPlanId) {
      this.getTestCasesByTestPlanId();
    } else {
      this.getTestCaseByUserId();
    }
  }
  getTestCasesByTestPlanId() {
    this.testcaseService.getTestCaseByTestPlanId(this.testPlanId).subscribe(
      (res) => {
        this.dataSource.data = res;
        this.selection = new SelectionModel<TestCaseModel>(true, []);
      },
      (err) => {
        this.snackbarService.openSnackBar('Error loading testcases');
      }
    );
  }

  getTestCaseByUserId(): void {
    this.testcaseService
      .getTestCaseByUserId(this.customerDetail.userId)
      .subscribe(
        (res) => {
          this.dataSource.data = res;
          this.selection = new SelectionModel<TestCaseModel>(true, []);
        },
        (err) => {
          this.snackbarService.openSnackBar('Error loading testcases');
        }
      );
  }

  navigateAddNewCondition(): void {
    this.router.navigate([
      '/configuration/testcases/',
      this.selection.selected[0].id,
      'conditions',
      'create',
    ]);
  }

  navigateViewCondition(): void {
    this.router.navigate([
      '/configuration/testcases/',
      this.selection.selected[0].id,
      'conditions',
    ]);
  }
}
