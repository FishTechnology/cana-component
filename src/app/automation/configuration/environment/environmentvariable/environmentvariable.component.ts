import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {
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
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ConfigKeyValueService } from '../../config/config-key-value/config-key-value.service';
import { EnvironmentModel } from '../models/EnvironmentModel';
import { ConfigService } from '../../config/config.service';
import ConfigKeyValueModel from '../../config/models/config-key-value-model';
import ConfigModel from '../../config/models/config-model';
import { ConfigType } from '../../config/models/config-type';
import { forkJoin, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-environmentvariable',
  templateUrl: './environmentvariable.component.html',
  styleUrls: ['./environmentvariable.component.scss'],
})
export class EnvironmentVariableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdon'];
  dataSource = new MatTableDataSource<ConfigKeyValueModel>();
  selection = new SelectionModel<ConfigKeyValueModel>(true, []);
  moment = moment;
  customerDetail!: CustomerDetail;
  environmentVariableModels!: ConfigKeyValueModel[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentId!: string;
  environmentModel!: ConfigModel;

  constructor(
    public dialog: MatDialog,
    public environmentVariableService: EnvironmentVariableService,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private configKeyValueService: ConfigKeyValueService,
    private configService: ConfigService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.route.params.subscribe((params) => {
        this.environmentId = params.environmentid;
        this.getEnvVariablesByEnvironmentId();
        this.getEnvironmentById();
      });
    });
  }

  getEnvironmentById() {
    this.configService
      .getConfigById(
        this.customerDetail.applicationId,
        this.environmentId,
        ConfigType.EnvironmentVariable
      )
      .subscribe((res) => {
        this.environmentModel = res;
      });
    // this.environmentService
    //   .getEnvironmentById(this.environmentId)
    //   .subscribe((res) => {
    //     this.environmentModel = res;
    //   });
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
  checkboxLabel(row?: ConfigKeyValueModel): string {
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
    // this.environmentVariableService
    //   .deleteEnvVariable(
    //     this.environmentId,
    //     this.selection.selected[0].id,
    //     this.customerDetail.userId
    //   )
    //   .subscribe(
    //     (res) => {
    //       this.snackbarService.openSnackBar(
    //         'successfully  delete environment variable'
    //       );
    //       this.getEnvVariablesByEnvironmentId();
    //     },
    //     (err) => {
    //       this.snackbarService.openSnackBar(
    //         'error while delete environment variable'
    //       );
    //     }
    //   );
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
    this.configKeyValueService
      .getConfigKeyValue(this.customerDetail.applicationId, this.environmentId)
      .subscribe(
        (res) => {
          this.dataSource.data = res;
          this.selection = new SelectionModel<ConfigKeyValueModel>(true, []);
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'Error while loading environment variables'
          );
        }
      );
    // this.environmentVariableService
    //   .getEnvVariablesByEnvId(this.environmentId)
    //   .subscribe(
    //     (res) => {
    //       this.dataSource.data = res;
    //       this.selection = new SelectionModel<EnvironmentVariableModel>(
    //         true,
    //         []
    //       );
    //     },
    //     (err) => {
    //       this.snackbarService.openSnackBar(
    //         'Error while loading environment variables'
    //       );
    //     }
    //   );
  }
}
