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
import { CreateEnvironmentComponent } from '../../environment/createenvironment/createenvironment.component';
import { EnvironmentService } from '../../environment/environment.service';
import { ApplicationService } from '../application.service';
import { CreateApplicationModel } from '../models/CreateApplicationModel';
import { UpdateApplicationModel } from '../models/UpdateApplicationModel';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent implements OnInit {
  @Output() applicationEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentValueTypes!: SelectModel[];
  applicationForm: FormGroup;
  files: File[] = [];
  customerDetail!: CustomerDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { customerDetail: CustomerDetail; applicationId: bigint },
    private applicationService: ApplicationService,
    private dialogRef: MatDialogRef<CreateEnvironmentComponent>,
    private snackbarService: SnackbarService
  ) {
    this.applicationForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.customerDetail = this.data.customerDetail;
    if (this.data.applicationId) {
      this.applicationService
        .getApplicationById(this.data.applicationId)
        .subscribe((res) => {
          this.applicationForm.get('id')!.setValue(res.id);
          this.applicationForm.get('name')!.setValue(res.name);
          this.applicationForm.get('comments')!.setValue(res.comments);
        });
    }
    this.environmentValueTypes = [
      { text: 'Key And Value', value: 'keyandvalue' },
      { text: 'File', value: 'file' },
    ];
  }

  createApplication(): void {
    if (this.applicationForm.get('id')?.value) {
      return this.updateApplication();
    }
    let createApplication: CreateApplicationModel = {
      name: this.applicationForm.get('name')?.value,
      comments: this.applicationForm.get('comments')?.value,
      userId: this.customerDetail.userId.toString(),
    };
    this.applicationService.createApplication(createApplication).subscribe(
      (res) => {
        this.snackbarService.openSnackBar('successfully created application');
        this.dialogRef.close();
        this.applicationEvent.emit('success');
      },
      (err) => {
        this.snackbarService.openSnackBar('Error in creating application');
      }
    );
  }
  updateApplication(): void {
    let updateApplicationModel: UpdateApplicationModel = {
      name: this.applicationForm.get('name')?.value,
      comments: this.applicationForm.get('comments')?.value,
      userId: this.customerDetail.userId.toString(),
    };
    this.applicationService
      .updateApplication(
        updateApplicationModel,
        this.applicationForm.get('id')?.value
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully updated application');
          this.dialogRef.close();
          this.applicationEvent.emit('success');
        },
        (err) => {
          this.snackbarService.openSnackBar('Error in update application');
        }
      );
  }
}
