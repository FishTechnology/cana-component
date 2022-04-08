import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { CustomerService } from '../../../../commons/customer/customer.service';
import { CustomerDetail } from '../../../../commons/customer/models/CustomerDetail';
import { ConfigType } from '../../config/models/config-type';
import { SnackbarService } from '../../../../commons/snackbar/snackbar.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import ConfigKeyValueModel from '../../config/models/config-key-value-model';
import { MatDialog } from '@angular/material/dialog';
import { CreateSystemComponent } from '../create-system/create-system.component';

@Component({
  selector: 'app-view-system',
  templateUrl: './view-system.component.html',
  styleUrls: ['./view-system.component.scss'],
})
export class ViewSystemComponent implements OnInit {
  displayedColumns: string[] = ['select', 'key', 'value', 'type', 'createdOn'];
  private customerDetail!: CustomerDetail;
  private configModels!: ConfigKeyValueModel[];
  dataSource = new MatTableDataSource<ConfigKeyValueModel>();
  selection = new SelectionModel<ConfigKeyValueModel>(true, []);

  constructor(
    public dialog: MatDialog,
    private configService: ConfigService,
    private customerService: CustomerService,
    private snackbarService: SnackbarService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getSystemVariables();
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

  getSystemVariables(): void {
    this.configService
      .getConfigByAppId(
        this.customerDetail.applicationId,
        ConfigType.SystemVariable
      )
      .subscribe({
        next: (res) => {
          this.configModels = res[0].configKeyValues;
          this.dataSource.data = this.configModels;
          this.selection = new SelectionModel<ConfigKeyValueModel>(true, []);
        },
        error: (err) => {
          this.snackbarService.openSnackBar(
            'error while getting system variables'
          );
        },
      });
  }

  refresh(): void {}

  createSystemVariable(): void {
    const modelRef = this.dialog.open(CreateSystemComponent, {
      data: {
        customerDetail: this.customerDetail,
      },
    });
    modelRef.componentInstance.systemEvent.subscribe((event) => {
      this.getSystemVariables();
    });
  }

  edit(): void {}

  delete(): void {}
}
