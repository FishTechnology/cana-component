import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ApplicationService } from './application.service';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ApplicationModel } from './models/ApplicationModel';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'createdon'];
  dataSource = new MatTableDataSource<ApplicationModel>();
  selection = new SelectionModel<ApplicationModel>(true, []);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  customerDetail!: CustomerDetail;
  applicationModels!: ApplicationModel[];

  constructor(
    private readonly applicationService: ApplicationService,
    public dialog: MatDialog,
    public customerService: CustomerService,
    private router: Router,
    private snackbarService: SnackbarService,
    private window: Window
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getApplicationByUserId();
    });
  }

  ngOnInit(): void {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  refresh(): void {
    this.getApplicationByUserId();
  }

  getApplicationByUserId(): void {
    this.applicationService
      .getApplicationByUserId(this.customerDetail.userId)
      .subscribe(
        (res) => {
          this.applicationModels = res;
          this.dataSource.data = this.applicationModels;
          this.selection = new SelectionModel<ApplicationModel>(true, []);
        },
        (err) => {
          this.snackbarService.openSnackBar('error while loading application');
        }
      );
  }

  createApplication(): void {
    var modelRef = this.dialog.open(CreateApplicationComponent, {
      data: {
        customerDetail: this.customerDetail,
      },
    });
    modelRef.componentInstance.applicationEvent.subscribe((event) => {
      this.getApplicationByUserId();
    });
  }

  deleteApplication(): void {
    this.selection.selected.forEach((env) => {
      this.applicationService.deleteApplication(env.id).subscribe(
        () => {
          this.snackbarService.openSnackBar('successfull deleted environments');
          this.window.location.reload();
        },
        () => {
          this.snackbarService.openSnackBar(
            'error while deleting environments'
          );
        }
      );
    });
  }

  editApplication() {
    var modelRef = this.dialog.open(CreateApplicationComponent, {
      data: {
        customerDetail: this.customerDetail,
        applicationId: this.selection.selected[0].id,
      },
    });

    modelRef.componentInstance.applicationEvent.subscribe((event) => {
      this.getApplicationByUserId();
    });
  }

  navigateApplicationConfigView() {
    this.router.navigate([
      '/configuration/applications/' +
        this.selection.selected[0].id +
        '/applicationconfigs',
    ]);
  }
}
