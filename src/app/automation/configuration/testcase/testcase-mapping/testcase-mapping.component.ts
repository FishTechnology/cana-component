import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-testcase-mapping',
  templateUrl: './testcase-mapping.component.html',
  styleUrls: ['./testcase-mapping.component.scss'],
})
export class TestcaseMappingComponent implements OnInit {
  customerDetail!: CustomerDetail;
  testcaseModels!: TestCaseModel[];
  selectedTestcaseModels!: TestCaseModel[];
  isReOrderTestCase: boolean = false;
  testPlanId!: string;
  testPlanModel!: TestPlanModel;
  testCaseId!: string;
  isAddTestCase: boolean = false;

  constructor(
    private testCaseService: TestCaseService,
    private testplanService: TestplanService,
    private customerService: CustomerService,
    private snackbarService: SnackbarService,
    private router: ActivatedRoute
  ) {
    this.selectedTestcaseModels = [];
    this.router.queryParams.subscribe((qparams) => {
      this.isReOrderTestCase = qparams['reorder'] === true;
      this.isAddTestCase = qparams['addtestcase'] === true;
    });
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
    });
    this.router.params.subscribe((params) => {
      this.testPlanId = params['testplanid'];
      this.testCaseId = params['testcaseid'];
      if (this.testPlanId) {
        this.getTestPlanById();
        this.getTestCaseByTestPlanId();
      } else {
        this.getTestPlanByUserId();
      }
    });
  }

  getTestPlanByUserId(): void {
    this.testplanService
      .getTestPlansByUserId(
        this.customerDetail.applicationId,
        this.customerDetail.userId
      )
      .subscribe(
        (res) => {
          // this.testPlanModels = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while getting test Plan ');
        }
      );
  }

  ngOnInit(): void {}

  saveTestCase(): void {
    let testCaseOrderModels: TestCaseOrderModel[] = [];
    this.testcaseModels.forEach((value, index) => {
      let testCaseOrderModel: TestCaseOrderModel = {
        testCaseId: value.id,
        currentExecutionOrder: index + 1,
        oldExecutionOrder: value.executionOrder,
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
        this.testPlanId,
        updateTestCaseOrderModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            ' successfully update test case order'
          );
          this.getTestCaseByTestPlanId();
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while updating test case orders'
          );
        }
      );
  }

  getTestCaseByTestPlanId() {
    this.testCaseService
      .getTestCaseByTestPlanId(
        this.customerDetail.applicationId,
        this.testPlanId
      )
      .subscribe(
        (res) => {
          this.testcaseModels = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while creating test case');
        }
      );
  }

  getTestCaseByUserId() {
    this.testCaseService
      .getTestCaseByUserId(
        this.customerDetail.applicationId,
        this.customerDetail.userId
      )
      .subscribe(
        (res) => {
          this.testcaseModels = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while creating test case');
        }
      );
  }

  getTestPlanById(): void {
    this.testplanService
      .getTestPlanById(this.customerDetail.applicationId, this.testPlanId)
      .subscribe(
        (res) => {
          this.testPlanModel = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while getting test plan');
        }
      );
  }

  refresh(): void {
    this.selectedTestcaseModels = [];
    this.getTestCaseByUserId();
  }

  drop(event: CdkDragDrop<TestCaseModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
