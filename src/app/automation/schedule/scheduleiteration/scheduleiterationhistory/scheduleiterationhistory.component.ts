import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  scheduleId!: number;
  scheduleIterationId!: number;
  scheduleIterationResultModel!: ScheduleIterationResultModel;
  actionResultModels!: ActionResultModel[];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private scheduleService: ScheduleService,
    private snackbarService: SnackbarService
  ) {
    this.router.params.subscribe((params) => {
      this.scheduleId = params.scheduleid;
      this.scheduleIterationId = params.scheduleiterationid;
      this.getScheduleResult();
    });
  }

  ngOnInit(): void {}

  getScheduleResult(): void {
    this.scheduleService
      .getScheduleResult(this.scheduleId, this.scheduleIterationId)
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
