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
import { CreateTestcaseComponent } from './createtestcase/createtestcase.component';
import { TestCaseModel } from './models/TestCaseModel';
import { TestCaseService } from './testcase.service';

export interface PeriodicElement {
  id: number;
  value: string;
  key: string;
  type: string;
  createdon: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },

  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },

  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 1,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
  {
    id: 2,
    key: 'username',
    value: 'howareyou@90',
    type: 'keyvalue',
    createdon: '1 Jan 2011, 00:00:00',
  },
];

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss'],
})
export class TestcaseComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdon'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  moment = moment;
  customerDetail: CustomerDetail;
  testcaseModels: TestCaseModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  testPlanId: number;
  constructor(
    public dialog: MatDialog,
    public testcaseService: TestCaseService,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.testPlanId = params['testplanid'];
    });

    this.customerService
      .getUserDetail()
      .subscribe((res) => (this.customerDetail = res));
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.key + 1
    }`;
  }

  createGlobalVariable() {
    this.dialog.open(CreateTestcaseComponent);
  }

  navigateAddNewAction(): void {
    this.router.navigate(['/testcases/10/actions/create']);
  }
  navigateViewNewAction(): void {}

  refresh() {
    // this.testcaseService
    //   .getGlobalVariable(this.customerDetail.userId)
    //   .subscribe((res) => (this.globalVariableModels = res));
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

  update() {
    // const globalVariableId = 10;
    // const userId = 10;
    // this.globalvariableService
    //   .deleteGlobalVariable(globalVariableId, userId)
    //   .subscribe((res) => {
    //     this.openSnackBar('successfully update global variable');
    //   });
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
