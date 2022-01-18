import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { TestPlanModel } from '../../testplan/models/TestPlanModel';
import { TestplanService } from '../../testplan/testplan.service';
import { CreateTestCaseByTestPlanIdModel } from '../models/CreateTestCaseByTestPlanIdModel';
import { CreateTestCaseModel } from '../models/CreateTestCaseModel';
import { TestCaseModel } from '../models/TestCaseModel';
import { TestCaseService } from '../testcase.service';

@Component({
  selector: 'app-createtestcase',
  templateUrl: './createtestcase.component.html',
  styleUrls: ['./createtestcase.component.scss'],
})
export class CreateTestcaseComponent implements OnInit {
  @Output() testCaseEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  testCaseform: FormGroup;
  files: File[] = [];
  testPlanModel!: TestPlanModel;
  testCaseModel!: TestCaseModel;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      testPlanId: string;
      testCaseId: string;
    },
    private _testCaseService: TestCaseService,
    private _testPlanService: TestplanService,
    private _router: Router,
    private dialogRef: MatDialogRef<CreateTestcaseComponent>,
    private snackbarService: SnackbarService
  ) {
    this.testCaseform = new FormGroup({
      name: new FormControl('', Validators.required),
      comments: new FormControl(''),
    });
    if (this.data.testPlanId) {
      this._testPlanService
        .getTestPlanById(
          this.data.customerDetail.applicationId,
          this.data.testPlanId
        )
        .subscribe(
          (res) => {
            this.testPlanModel = res;
          },
          (err) => {
            this.snackbarService.openSnackBar(
              'Error while fetching data from server'
            );
          }
        );
    }

    if (this.data.testCaseId) {
      this._testCaseService.getTestCaseById(this.data.testCaseId).subscribe(
        (res) => {
          this.testCaseModel = res;
          this.testCaseform.get('name')!.setValue(res.name);
          this.testCaseform.get('comments')!.setValue(res.comments);
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'Error while fetching data from server'
          );
        }
      );
    }
  }

  ngOnInit(): void {}

  createTestCase(): void {
    if (this.data.testPlanId) {
      var createTestCaseByTestPlanIdModel: CreateTestCaseByTestPlanIdModel = {
        name: this.testCaseform.get('name')!.value,
        comments: this.testCaseform.get('comments')!.value,
        userId: this.data.customerDetail.userId,
      };
      this._testCaseService
        .createTestCaseByTestPlanId(
          this.data.testPlanId,
          createTestCaseByTestPlanIdModel
        )
        .subscribe(
          (res) => {
            this.snackbarService.openSnackBar('successfully created test case');
            this.dialogRef.close();
            this.testCaseEvent.emit('success');
            this._router.navigate([
              '/configuration/testplans/' + this.data.testPlanId + '/testcases',
            ]);
          },
          (err) => {
            this.snackbarService.openSnackBar('error while creating test case');
          }
        );
      return;
    }

    var createTestCaseModel: CreateTestCaseModel = {
      name: this.testCaseform.get('name')!.value,
      comments: this.testCaseform.get('comments')!.value,
      userId: this.data.customerDetail.userId,
    };
    this._testCaseService.createTestCase(createTestCaseModel).subscribe(
      (res) => {
        this.snackbarService.openSnackBar('successfully created test case');
        this.dialogRef.close();
        this.testCaseEvent.emit('success');
      },
      (err) => {
        this.snackbarService.openSnackBar('error while creating test case');
      }
    );
  }
}
