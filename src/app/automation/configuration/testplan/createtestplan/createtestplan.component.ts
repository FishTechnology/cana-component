import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { CopyTestPlanModel } from '../models/CopyTestPlanModel';
import { CreateTestplanModel } from '../models/CreateTestplanModel';
import { UpdateTestplanModel } from '../models/UpdateTestplanModel';
import { TestplanService } from '../testplan.service';

@Component({
  selector: 'app-createtestplan',
  templateUrl: './createtestplan.component.html',
  styleUrls: ['./createtestplan.component.scss'],
})
export class CreateTestplanComponent implements OnInit {
  @Output() testPlanEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  testplanform: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      testPlanId: string;
      isTestPlanCopy: boolean;
    },
    private testplanService: TestplanService,
    private dialogRef: MatDialogRef<CreateTestplanComponent>,
    private snackbarService: SnackbarService
  ) {
    this.testplanform = new FormGroup({
      name: new FormControl(''),
      comments: new FormControl(''),
    });
    if (this.data.testPlanId) {
      this.testplanService
        .getTestPlanById(
          this.data.customerDetail.applicationId,
          this.data.testPlanId
        )
        .subscribe((res) => {
          let testPlanName = res.name;
          if (this.data.isTestPlanCopy) {
            testPlanName = 'Copy - ' + testPlanName;
          } else {
            this.testplanform.get('comments')!.setValue(res.comments);
          }
          this.testplanform.get('name')!.setValue(testPlanName);
        });
    }
  }

  ngOnInit(): void {}

  createTestplan(): void {
    if (this.data?.isTestPlanCopy) {
      return this.copyTestplan();
    }

    if (this.data?.testPlanId) {
      return this.updateTestplan();
    }

    var createTestplanModel: CreateTestplanModel = {
      name: this.testplanform.get('name')!.value,
      comments: this.testplanform.get('comments')!.value,
      userId: this.data.customerDetail.userId,
    };
    this.testplanService
      .createTestplan(
        this.data.customerDetail.applicationId,
        createTestplanModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfull created test plan');
          this.dialogRef.close();
          this.testPlanEvent.emit('success');
        },
        (error) => {
          this.snackbarService.openSnackBar('error in created test plan');
        }
      );
  }

  copyTestplan(): void {
    var copyTestPlanModel: CopyTestPlanModel = {
      name: this.testplanform.get('name')!.value,
      comments: this.testplanform.get('comments')!.value,
      userId: this.data.customerDetail.userId,
    };

    this.testplanService
      .copyTestPlan(this.data.testPlanId, copyTestPlanModel)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfull copied test plan');
          this.dialogRef.close();
          this.testPlanEvent.emit('success');
        },
        (error) => {
          this.snackbarService.openSnackBar('error in copy test plan');
        }
      );
  }

  updateTestplan(): void {
    var updateTestplanModel: UpdateTestplanModel = {
      name: this.testplanform.get('name')!.value,
      comments: this.testplanform.get('comments')!.value,
      userId: this.data.customerDetail.userId,
    };
    this.testplanService
      .updateTestPlan(
        this.data.customerDetail.applicationId,
        this.data.testPlanId,
        updateTestplanModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfull updated test plan');
          this.dialogRef.close();
          this.testPlanEvent.emit('success');
        },
        (error) => {
          this.snackbarService.openSnackBar('error in update test plan');
        }
      );
  }
}
