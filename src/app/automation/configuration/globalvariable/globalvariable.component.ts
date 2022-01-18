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
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ConfigService } from '../config/config.service';
import { CreateConfigModel } from '../config/models/create-config-model';
import { ConfigType } from '../config/models/config-type';
import ConfigKeyValueModel from '../config/models/config-key-value-model';
import ConfigModel from '../config/models/config-model';

@Component({
  selector: 'app-globalvariable',
  templateUrl: './globalvariable.component.html',
  styleUrls: ['./globalvariable.component.scss'],
})
export class GlobalvariableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdon'];
  dataSource = new MatTableDataSource<ConfigKeyValueModel>();
  selection = new SelectionModel<ConfigKeyValueModel>(true, []);
  moment = moment;
  customerDetail: CustomerDetail | undefined;
  globalVariableModels: ConfigKeyValueModel[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  configModel?: ConfigModel;

  constructor(
    public dialog: MatDialog,
    public globalvariableService: GlobalvariableService,
    public customerService: CustomerService,
    private snackbarService: SnackbarService,
    private configService: ConfigService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getGlobalVariables();
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
  checkboxLabel(row?: GlobalVariableModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //   row.key + 1
    // }`;
    return '';
  }

  createGlobalVariable() {
    var modelRef = this.dialog.open(CreateGlobalVariableComponent, {
      data: {
        customerDetail: this.customerDetail,
        configId: this.configModel?.id,
      },
    });
    modelRef.componentInstance.globalVariableEvent.subscribe((res) => {
      this.getGlobalVariables();
    });
  }

  refresh() {
    this.getGlobalVariables();
  }

  delete() {
    this.globalvariableService
      .deleteGlobalVariable(
        this.selection.selected[0].id,
        this.customerDetail!.userId
      )
      .subscribe((res) => {
        this.snackbarService.openSnackBar(
          'successfully delete global variables'
        );
        this.getGlobalVariables();
      });
  }

  update() {
    var modelRef = this.dialog.open(CreateGlobalVariableComponent, {
      data: {
        customerDetail: this.customerDetail,
        globalVariableId: this.selection.selected[0].id,
      },
    });
    modelRef.componentInstance.globalVariableEvent.subscribe((res) => {
      this.getGlobalVariables();
    });
  }

  getGlobalVariables(): void {
    this.configService
      .getConfigByAppId(
        this.customerDetail!.applicationId,
        ConfigType.GlobalVariable
      )
      .subscribe(
        (res) => {
          if (!res) {
            this.createConfigComponent();
            return;
          }
          if (res.length === 0) {
            return;
          }
          this.configModel = res[0];
          if (res[0].configKeyValues && res[0].configKeyValues.length >= 1) {
            this.dataSource.data = res[0].configKeyValues;
            this.selection = new SelectionModel<ConfigKeyValueModel>(true, []);
          }
        },
        (err) => {
          this.snackbarService.openSnackBar('error loading global config');
        }
      );
  }

  createConfigComponent(): void {
    let createConfigModel: CreateConfigModel = {
      name: 'Global Variable',
      userId: this.customerDetail!.userId,
      applicationId: this.customerDetail!.applicationId,
    };

    this.configService
      .createConfig(
        this.customerDetail!.applicationId,
        ConfigType.GlobalVariable,
        createConfigModel
      )
      .subscribe(
        (res) => {
          this.getGlobalVariables();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
