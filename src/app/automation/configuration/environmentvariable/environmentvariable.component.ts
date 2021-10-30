import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { EnvironmentVariableModel } from '../environmentvariable/models/EnvironmentVariableModel';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { EnvironmentVariableService } from './environmentvariable.service';
import { CreateEnvironmentVariableComponent } from './createenvironmentvariable/createenvironmentvariable.component';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentService } from '../environment/environment.service';
import { EnvironmentModel } from '../environment/models/EnvironmentModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';

@Component({
  selector: 'app-environmentvariable',
  templateUrl: './environmentvariable.component.html',
  styleUrls: ['./environmentvariable.component.scss'],
})
export class EnvironmentVariableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdon'];
  dataSource = new MatTableDataSource<EnvironmentVariableModel>();
  selection = new SelectionModel<EnvironmentVariableModel>(true, []);
  moment = moment;
  customerDetail!: CustomerDetail;
  environmentVariableModels!: EnvironmentVariableModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentId!: number;
  environmentModel!: EnvironmentModel;

  constructor(
    public dialog: MatDialog,
    public environmentVariableService: EnvironmentVariableService,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private environmentService: EnvironmentService,
    private snackbarService: SnackbarService
  ) {
    this.route.params.subscribe((params) => {
      this.environmentId = params.environmentid;
      this.getEnvVariablesByEnvironmentId();
      this.getEnvironmentById();
    });
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
    });
  }

  getEnvironmentById() {
    this.environmentService
      .getEnvironmentById(this.environmentId)
      .subscribe((res) => {
        this.environmentModel = res;
      });
  }

  ngOnInit(): void {}

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
  checkboxLabel(row?: EnvironmentVariableModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.key + 1
    }`;
  }

  createEnvironmentVariable() {
    var modelRef = this.dialog.open(CreateEnvironmentVariableComponent, {
      data: {
        customerDetail: this.customerDetail,
        environmentId: this.environmentId,
      },
    });
    modelRef.componentInstance.environmentVariableEvent.subscribe((event) => {
      this.getEnvVariablesByEnvironmentId();
    });
  }

  refresh() {
    this.getEnvVariablesByEnvironmentId();
  }

  delete() {
    this.environmentVariableService
      .deleteEnvVariable(
        this.environmentId,
        this.selection.selected[0].id,
        this.customerDetail.userId
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfully  delete environment variable'
          );
          this.getEnvVariablesByEnvironmentId();
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while delete environment variable'
          );
        }
      );
  }

  update() {
    var modelRef = this.dialog.open(CreateEnvironmentVariableComponent, {
      data: {
        customerDetail: this.customerDetail,
        environmentId: this.environmentId,
        envVariableId: this.selection.selected[0].id,
      },
    });
    modelRef.componentInstance.environmentVariableEvent.subscribe((event) => {
      this.getEnvVariablesByEnvironmentId();
    });
  }

  getEnvVariablesByEnvironmentId() {
    this.environmentVariableService
      .getEnvVariablesByEnvId(this.environmentId)
      .subscribe((res) => {
        this.dataSource.data = res;
      });
  }
}
