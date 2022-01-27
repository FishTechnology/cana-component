import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { TestCaseModel } from '../../testcase/models/TestCaseModel';
import { TestCaseService } from '../../testcase/testcase.service';
import { TestPlanModel } from '../models/TestPlanModel';
import { TestplanService } from '../testplan.service';

@Component({
  selector: 'app-add-testcases',
  templateUrl: './add-testcases.component.html',
  styleUrls: ['./add-testcases.component.scss'],
})
export class AddTestcasesComponent implements OnInit {
  testPlanModels!: TestPlanModel[];
  testCaseModels!: TestCaseModel[];
  finalTestCaseModels!: TestCaseModel[];
  customerDetail!: CustomerDetail;

  constructor(
    private testPlanService: TestplanService,
    private customerService: CustomerService,
    private testCaseService: TestCaseService
  ) {
    let emptyTestCase = {} as TestCaseModel;
    this.finalTestCaseModels = [];
    this.finalTestCaseModels.push(emptyTestCase);
    this.customerService.getUserDetail().subscribe({
      next: (res) => {
        this.customerDetail = res;
        this.getTestPlanByAppId();
      },
      error: (err) => {},
    });
  }

  ngOnInit(): void {}

  refresh(): void {}

  testPlanClick(testPlanModel: TestPlanModel): void {
    this.testCaseService
      .getTestCaseByTestPlanId(
        this.customerDetail.applicationId,
        testPlanModel.id
      )
      .subscribe({
        next: (res) => {
          this.testCaseModels = res;
        },
        error: (err) => {},
      });
  }

  getTestPlanByAppId(): void {
    this.testPlanService
      .getTestPlanByAppId(this.customerDetail.applicationId)
      .subscribe({
        next: (res) => {
          this.testPlanModels = res;
        },
        error: (err) => {},
      });
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
