import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { TestPlanModel } from '../../testplan/models/TestPlanModel';
import { TestplanService } from '../../testplan/testplan.service';
import { TestCaseModel } from '../models/TestCaseModel';
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

  constructor(
    private testCaseService: TestCaseService,
    private testPlanService: TestplanService,
    private customerService: CustomerService
  ) {
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getTestPlanByUserId();
    });
  }

  ngOnInit(): void {}

  refresh(): void {}

  getTestPlanByUserId(): void {
    this.testPlanService
      .getTestPlansByUserId(this.customerDetail.userId)
      .subscribe(
        (res) => {
          this.testPlanModels = res;
        },
        (err) => {}
      );
  }

  getTestCaseByTestPlanId(testPlanId: string): void {
    this.testCaseService.getTestCaseByTestPlanId(testPlanId).subscribe(
      (res) => {
        this.testCaseModels = res;
      },
      (err) => {}
    );
  }

  drop(event: CdkDragDrop<TestCaseModel[]>) {
    moveItemInArray(
      this.testCaseModels,
      event.previousIndex,
      event.currentIndex
    );
  }
}
