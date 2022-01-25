import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { TestPlanModel } from '../../testplan/models/TestPlanModel';
import { TestplanService } from '../../testplan/testplan.service';
import { TestCaseModel } from '../models/TestCaseModel';
import { TestCaseOrderModel } from '../models/TestCaseOrderModel';
import { UpdateTestCaseOrderModel } from '../models/UpdateTestCaseOrderModel';
import { TestCaseService } from '../testcase.service';

@Component({
  selector: 'app-add-testcase',
  templateUrl: './add-testcase.component.html',
  styleUrls: ['./add-testcase.component.scss'],
})
export class AddTestcaseComponent implements OnInit {
  customerDetail!: CustomerDetail;
  testPlanModels!: TestPlanModel[];
  testCaseModels!: TestCaseModel[];
  newTestCaseModel!: TestCaseModel;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  testCaseId!: string;
  selectedTestPlan!: TestPlanModel;
  isShowSaveAction: boolean = false;

  constructor(
    private testCaseService: TestCaseService,
    private testPlanService: TestplanService,
    private customerService: CustomerService,
    private snackbarService: SnackbarService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((params) => {
      this.testCaseId = params['testcaseid'];
      this.getTestCaseByTestCaseId();
    });
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getTestPlanByUserId();
    });
  }

  getTestCaseByTestCaseId(): void {
    this.testCaseService
      .getTestCaseById(this.customerDetail.applicationId, this.testCaseId)
      .subscribe(
        (res) => {
          this.newTestCaseModel = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('Error loading test case by id');
        }
      );
  }

  ngOnInit(): void {}

  refresh(): void {}

  getTestPlanByUserId(): void {
    this.testPlanService
      .getTestPlansByUserId(
        this.customerDetail.applicationId,
        this.customerDetail.userId
      )
      .subscribe({
        next: (res) => {
          this.testPlanModels = res;
        },
        error: (err) => {},
      });
  }

  getTestCaseByTestPlanId(testPlanId: string): void {
    this.testCaseService
      .getTestCaseByTestPlanId(this.customerDetail.applicationId, testPlanId)
      .subscribe(
        (res) => {
          this.testCaseModels = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('Error loading test case');
        }
      );
  }

  drop(event: CdkDragDrop<TestCaseModel[]>) {
    moveItemInArray(
      this.testCaseModels,
      event.previousIndex,
      event.currentIndex
    );
  }

  testPlanClick(testPlanModel: TestPlanModel): void {
    this.selectedTestPlan = testPlanModel;
    this.testCaseService
      .getTestCaseByTestPlanId(
        this.customerDetail.applicationId,
        testPlanModel.id
      )
      .subscribe(
        (res) => {
          this.testCaseModels = res;
          this.isShowSaveAction = true;
        },
        (err) => {
          this.snackbarService.openSnackBar('Error loading test plan');
        }
      );
  }

  addTestCase(): void {
    this.testCaseModels.push(this.newTestCaseModel);
  }

  saveTestCase(): void {
    let testCaseOrderModels: TestCaseOrderModel[] = [];

    this.testCaseModels.forEach((testCaseModel, index) => {
      let testCaseOrderModel: TestCaseOrderModel = {
        testCaseId: testCaseModel.id,
        oldExecutionOrder: testCaseModel.executionOrder,
        currentExecutionOrder: index + 1,
      };
      testCaseOrderModels.push(testCaseOrderModel);
    });

    let updateTestCaseOrderModel: UpdateTestCaseOrderModel = {
      userId: this.customerDetail.userId,
      testcaseOrderModels: testCaseOrderModels,
    };

    this.testCaseService
      .updateTestCaseOrder(
        this.customerDetail.applicationId,
        this.selectedTestPlan.id,
        updateTestCaseOrderModel
      )
      .subscribe({
        next: (res) => {
          this.snackbarService.openSnackBar('Successfully updated order');
        },
        error: (err) => {
          this.snackbarService.openSnackBar('Error while updating order');
        },
      });
  }
}
