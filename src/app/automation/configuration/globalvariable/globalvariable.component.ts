import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { CreateGlobalVariableComponent } from './createglobalvariable/createglobalvariable.component';
import { GlobalvariableService } from './globalvariable.service';
import { CustomerService } from '../../../commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { GlobalVariableModel } from './models/GlobalVariableModel';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
  selector: 'app-globalvariable',
  templateUrl: './globalvariable.component.html',
  styleUrls: ['./globalvariable.component.scss'],
})
export class GlobalvariableComponent implements OnInit {
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
    public globalvariableService: GlobalvariableService,
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
    this.dialog.open(CreateGlobalVariableComponent);
  }

  refresh() {
    this.globalvariableService
      .getGlobalVariable(this.customerDetail.userId)
      .subscribe((res) => (this.globalVariableModels = res));
  }

  delete() {
    const globalVariableId = 10;
    const userId = 10;
    this.globalvariableService
      .deleteGlobalVariable(globalVariableId, userId)
      .subscribe((res) => {
        this.openSnackBar('successfully delete global variables');
      });
  }

  update() {
    const globalVariableId = 10;
    const userId = 10;
    this.globalvariableService
      .deleteGlobalVariable(globalVariableId, userId)
      .subscribe((res) => {
        this.openSnackBar('successfully update global variable');
      });
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
