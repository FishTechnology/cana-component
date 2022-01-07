import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ApplicationConfigService } from '../application-config.service';
import { CreateApplicationConfigModel } from '../models/create-application-config-model';
import { UpdateApplicationConfigModel } from '../models/update-application-config-model';

@Component({
  selector: 'app-create-application-config',
  templateUrl: './create-application-config.component.html',
  styleUrls: ['./create-application-config.component.scss'],
})
export class CreateApplicationConfigComponent implements OnInit {
  @Output() applicationConfigEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentValueTypes!: SelectModel[];
  applicationConfigForm: FormGroup;
  files: File[] = [];
  customerDetail!: CustomerDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      applicationId: string;
      applicationConfigId: string;
    },
    private applicationConfigService: ApplicationConfigService,
    private dialogRef: MatDialogRef<CreateApplicationConfigComponent>,
    private snackbarService: SnackbarService
  ) {
    this.applicationConfigForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  createApplicationConfig(): void {
    if (this.applicationConfigForm.get('id')?.value) {
      return this.updateApplicationConfig();
    }
    let createApplicationConfig: CreateApplicationConfigModel = {
      key: this.applicationConfigForm.get('key')?.value,
      comments: this.applicationConfigForm.get('comments')?.value,
      userId: this.customerDetail.userId.toString(),
      value: this.applicationConfigForm.get('value')?.value,
    };
    this.applicationConfigService
      .createApplicationConfig(createApplicationConfig, this.data.applicationId)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully created application');
          this.dialogRef.close();
          this.applicationConfigEvent.emit('success');
        },
        (err) => {
          this.snackbarService.openSnackBar('Error in creating application');
        }
      );
  }
  updateApplicationConfig(): void {
    let updateApplicationConfigModel: UpdateApplicationConfigModel = {
      key: this.applicationConfigForm.get('key')?.value,
      comments: this.applicationConfigForm.get('comments')?.value,
      userId: this.customerDetail.userId.toString(),
      value: this.applicationConfigForm.get('value')?.value,
    };
    this.applicationConfigService
      .updateApplicationConfig(
        updateApplicationConfigModel,
        this.data.applicationId,
        this.applicationConfigForm.get('id')?.value
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully updated application');
          this.dialogRef.close();
          this.applicationConfigEvent.emit('success');
        },
        (err) => {
          this.snackbarService.openSnackBar('Error in update application');
        }
      );
  }
}
