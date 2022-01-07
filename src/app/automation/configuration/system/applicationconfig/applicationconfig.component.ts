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
import { ApplicationModel } from '../models/ApplicationModel';
import { ApplicationConfigService } from './application-config.service';
import { CreateApplicationConfigComponent } from './create-application-config/create-application-config.component';
import { ApplicationConfigModel } from './models/application-config-model';

@Component({
  selector: 'app-applicationconfig',
  templateUrl: './applicationconfig.component.html',
  styleUrls: ['./applicationconfig.component.scss'],
})
export class ApplicationconfigComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'createdon'];
  dataSource = new MatTableDataSource<ApplicationConfigModel>();
  selection = new SelectionModel<ApplicationConfigModel>(true, []);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  customerDetail!: CustomerDetail;
  applicationModels!: ApplicationModel[];
  applicationConfigModels!: ApplicationConfigModel[];

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    public dialog: MatDialog,
    public customerService: CustomerService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  refresh() {
    this.getApplicationConfigByAppId();
  }
  getApplicationConfigByAppId() {
    throw new Error('Method not implemented.');
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

  createApplicationConfig() {
    var modelRef = this.dialog.open(CreateApplicationConfigComponent, {
      data: {
        customerDetail: this.customerDetail,
      },
    });
    modelRef.componentInstance.applicationConfigEvent.subscribe((event) => {
      this.getApplicationConfigByAppId();
    });
  }

  deleteApplicationConfig() {
    this.selection.selected.forEach((env) => {
      this.applicationConfigService.deleteApplication(env.id).subscribe(
        () => {
          this.snackbarService.openSnackBar('successfull deleted environments');
          this.getApplicationConfigByAppId();
        },
        () => {
          this.snackbarService.openSnackBar(
            'error while deleting environments'
          );
        }
      );
    });
  }

  editApplicationConfig() {
    var modelRef = this.dialog.open(CreateApplicationConfigComponent, {
      data: {
        customerDetail: this.customerDetail,
        applicationId: this.selection.selected[0].id,
      },
    });

    modelRef.componentInstance.applicationConfigEvent.subscribe((event) => {
      this.getApplicationConfigByAppId();
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
