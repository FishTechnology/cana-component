import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { TestPlanModel } from '../../testplan/models/TestPlanModel';
import { TestplanService } from '../../testplan/testplan.service';
import { CreateTestCaseByTestPlanIdModel } from '../models/CreateTestCaseByTestPlanIdModel';
import { CreateTestCaseModel } from '../models/CreateTestCaseModel';
import { TestCaseService } from '../testcase.service';

@Component({
  selector: 'app-createtestcase',
  templateUrl: './createtestcase.component.html',
  styleUrls: ['./createtestcase.component.scss'],
})
export class CreateTestcaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  testCaseform: FormGroup;
  files: File[] = [];
  testPlanModel: TestPlanModel;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      testPlanId: number;
      testCaseId: number;
    },
    private _testCaseService: TestCaseService,
    private _snackBar: MatSnackBar,
    private _testPlanService: TestplanService,
    private _router: Router,
    private dialogRef: MatDialogRef<CreateTestcaseComponent>
  ) {
    this.testCaseform = new FormGroup({
      name: new FormControl('', Validators.required),
      comments: new FormControl(''),
    });
    if (this.data.testPlanId) {
      this._testPlanService.getTestPlanById(this.data.testPlanId).subscribe(
        (res) => {
          this.testPlanModel = res;
        },
        (err) => {
          this.openSnackBar('Error while fetching data from server');
        }
      );
    }
  }

  ngOnInit(): void {}

  createTestCase(): void {
    if (this.data.testPlanId) {
      var createTestCaseByTestPlanIdModel: CreateTestCaseByTestPlanIdModel = {
        name: this.testCaseform.get('name').value,
        comments: this.testCaseform.get('comments').value,
        userId: this.data.customerDetail.userId,
      };
      this._testCaseService
        .createTestCaseByTestPlanId(
          this.data.testPlanId,
          createTestCaseByTestPlanIdModel
        )
        .subscribe(
          (res) => {
            this.openSnackBar('successfully created test case');
            this.dialogRef.close();
            this._router.navigate([
              '/configuration/testplans/' + this.data.testPlanId + '/testcases',
            ]);
          },
          (err) => {
            this.openSnackBar('error while creating test case');
          }
        );
      return;
    }

    var createTestCaseModel: CreateTestCaseModel = {
      name: this.testCaseform.get('name').value,
      comments: this.testCaseform.get('comments').value,
      userId: this.data.customerDetail.userId,
    };
    this._testCaseService.createTestCase(createTestCaseModel).subscribe(
      (res) => {
        this.openSnackBar('successfully created test case');
      },
      (err) => {
        this.openSnackBar('error while creating test case');
      }
    );
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
