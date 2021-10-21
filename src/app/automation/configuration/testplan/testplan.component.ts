import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
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
  selector: 'app-testplan',
  templateUrl: './testplan.component.html',
  styleUrls: ['./testplan.component.scss'],
})
export class TestplanComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdon'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  moment = moment;
  customerDetail: CustomerDetail;
  globalVariableModels: GlobalVariableModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    public testplanService: TestplanService,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) {
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
    this.dialog.open(CreateTestplanComponent);
  }

  scheduleTestPlan(): void {
    this.dialog.open(ScheduleComponent);
  }

  refresh() {
    // this.testplanService
    //   .getGlobalVariable(this.customerDetail.userId)
    //   .subscribe((res) => (this.globalVariableModels = res));
  }

  delete() {
    const globalVariableId = 10;
    const userId = 10;
    // this.testplanService
    //   .deleteGlobalVariable(globalVariableId, userId)
    //   .subscribe((res) => {
    //     this.openSnackBar('successfully delete global variables');
    //   });
  }

  update() {
    const globalVariableId = 10;
    const userId = 10;
    // this.testplanService
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
