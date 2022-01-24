import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ScheduleService } from '../../schedule.service';
import { ActionResultModel } from './models/ActionResultModel';
import { ScheduleIterationResultModel } from './models/ScheduleIterationResultModel';
import { TestCaseResultModel } from './models/TestCaseResultModel';

@Component({
  selector: 'app-scheduleiterationhistory',
  templateUrl: './scheduleiterationhistory.component.html',
  styleUrls: ['./scheduleiterationhistory.component.scss'],
})
export class ScheduleIterationHistoryComponent implements OnInit {
  scheduleId!: string;
  scheduleIterationId!: string;
  scheduleIterationResultModel!: ScheduleIterationResultModel;
  actionResultModels!: ActionResultModel[];
  customerDetail!: CustomerDetail;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private scheduleService: ScheduleService,
    private snackbarService: SnackbarService,
    private customerService: CustomerService
  ) {
    this.router.params.subscribe((params) => {
      this.scheduleId = params.scheduleid;
      this.scheduleIterationId = params.scheduleiterationid;
      this.customerService.getUserDetail().subscribe({
        next: (res) => {
          this.customerDetail = res;
          this.getScheduleResult();
        },
        error: () => {},
      });
    });
  }

  ngOnInit(): void {}

  getScheduleResult(): void {
    this.scheduleService
      .getScheduleResult(
        this.customerDetail.applicationId,
        this.scheduleId,
        this.scheduleIterationId
      )
      .subscribe(
        (res) => {
          this.scheduleIterationResultModel = res;
          this.actionResultModels =
            res.testPlanResultSummary.testCaseResults[0].actionResults;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while loading testplan');
        }
      );
  }

  showAction(testCaseResultModel: TestCaseResultModel): void {
    this.actionResultModels = testCaseResultModel.actionResults;
  }
}
