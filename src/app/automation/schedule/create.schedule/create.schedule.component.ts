import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { BrowserType } from 'src/app/commons/models/BrowserTypeEnums';
import { SelectModel } from 'src/app/commons/models/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { EnvironmentService } from '../../configuration/environment/environment.service';
import { EnvironmentModel } from '../../configuration/environment/models/EnvironmentModel';
import { TestPlanModel } from '../../configuration/testplan/models/TestPlanModel';
import { TestplanService } from '../../configuration/testplan/testplan.service';
import { CreateNotificationModel } from '../models/CreateNotificationModel';
import { CreateScheduleModel } from '../models/CreateScheduleModel';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create.schedule.component.html',
  styleUrls: ['./create.schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit {
  testPlanId!: string;
  testPlanModel!: TestPlanModel;
  customerDetail!: CustomerDetail;
  environmentDetails!: EnvironmentModel[];
  supportedBrowserTypes: SelectModel[] = [
    {
      text: 'Google Chrome',
      value: BrowserType.Google_Chrome,
    },
    {
      text: 'Internet Explorer',
      value: BrowserType.Internet_Explorer,
    },
    {
      text: 'Mozilla Firefox',
      value: BrowserType.Mozilla_Firefox,
    },
    {
      text: 'Opera',
      value: BrowserType.Opera,
    },
    {
      text: 'Safari',
      value: BrowserType.Safari,
    },
  ];

  scheduleFormControl = new FormGroup({
    environmenId: new FormControl('', Validators.required),
    recordVideo: new FormControl(true),
    disableScreenshot: new FormControl(false),
    captureNetworkTraffic: new FormControl(false),
    emailAddresses: new FormControl(''),
    browserType: new FormControl(
      BrowserType.Google_Chrome,
      Validators.required
    ),
  });
  constructor(
    private testPlanService: TestplanService,
    private environmentService: EnvironmentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private customerService: CustomerService,
    private scheduleService: ScheduleService
  ) {
    route.params.subscribe((params) => {
      this.testPlanId = params.testplanid;
      this.getTestPlanDetail();
    });
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
      this.getEnvironmentByUserId();
    });
  }

  ngOnInit(): void {}

  getTestPlanDetail(): void {
    this.testPlanService.getTestPlanById(this.testPlanId).subscribe(
      (res) => {
        this.testPlanModel = res;
      },
      (err) => {
        this.snackbarService.openSnackBar('error loading test plans');
      }
    );
  }
  getEnvironmentByUserId(): void {
    this.environmentService
      .getEnvironment(this.customerDetail.userId)
      .subscribe(
        (res) => {
          this.environmentDetails = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error while loading environment');
        }
      );
  }

  createSchedule(): void {
    let createScheduleModel: CreateScheduleModel = {
      environmentId: this.scheduleFormControl.get('environmenId')?.value,
      userId: this.customerDetail.userId,
      isCaptureNetworkTraffic: this.scheduleFormControl.get(
        'captureNetworkTraffic'
      )?.value,
      isDisableScreenshot:
        this.scheduleFormControl.get('disableScreenshot')?.value,
      isRecordVideoEnabled: this.scheduleFormControl.get('recordVideo')?.value,
      browserType: this.scheduleFormControl.get('browserType')?.value,
    };

    if (this.scheduleFormControl.get('emailAddresses')?.value) {
      let notificationModel: CreateNotificationModel = {
        emailAddress: this.scheduleFormControl.get('emailAddresses')?.value,
      };
      createScheduleModel.notification = notificationModel;
    }
    this.scheduleService
      .createSchedule(this.testPlanId, createScheduleModel)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully created schedule');
          this.router.navigate(['/configuration/schedules']);
        },
        (err) => {
          this.snackbarService.openSnackBar('error while creating schedule');
        }
      );
  }
}
