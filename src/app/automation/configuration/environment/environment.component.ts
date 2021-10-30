import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CreateEnvironmentComponent } from './createenvironment/createenvironment.component';
import { EnvironmentService } from './environment.service';
import { EnvironmentModel } from './models/EnvironmentModel';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss'],
})
export class EnvironmentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'createdon'];
  dataSource = new MatTableDataSource<EnvironmentModel>();
  selection = new SelectionModel<EnvironmentModel>(true, []);
  moment = moment;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  customerDetail!: CustomerDetail;
  environmentModels!: EnvironmentModel[];

  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService,
    private environmentService: EnvironmentService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getEnvironmentByUserId();
    });
    // this.environmentVariableViewUrl =
    //   '/environments/' +
    //   this.selection.selected[0].id +
    //   '/environmentvariables';
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

  createEnvironment() {
    var modelRef = this.dialog.open(CreateEnvironmentComponent, {
      data: {
        customerDetail: this.customerDetail,
      },
    });
    modelRef.componentInstance.environmentEvent.subscribe((event) => {
      this.getEnvironmentByUserId();
    });
  }

  editEnvironment(): void {
    var modelRef = this.dialog.open(CreateEnvironmentComponent, {
      data: {
        customerDetail: this.customerDetail,
        environmentId: this.selection.selected[0].id,
      },
    });

    modelRef.componentInstance.environmentEvent.subscribe((event) => {
      this.getEnvironmentByUserId();
    });
  }

  deleteEnvironments() {
    this.selection.selected.forEach((env) => {
      this.environmentService.deleteEnvironment(env.id).subscribe(
        () => {
          this.snackbarService.openSnackBar('successfull deleted environments');
          this.getEnvironmentByUserId();
        },
        () => {
          this.snackbarService.openSnackBar(
            'error while deleting environments'
          );
        }
      );
    });
  }

  refresh() {
    this.getEnvironmentByUserId();
  }

  navigateEnvVariableView() {
    this.router.navigate([
      '/configuration/environments/' +
        this.selection.selected[0].id +
        '/environmentvariables',
    ]);
  }

  getEnvironmentByUserId(): void {
    this.environmentService
      .getEnvironment(this.customerDetail.userId)
      .subscribe((res) => {
        this.environmentModels = res;
        this.dataSource.data = this.environmentModels;
      });
  }
}
