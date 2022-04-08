import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { BrowserType } from 'src/app/commons/models/BrowserTypeEnums';
import { SelectModel } from 'src/app/commons/models/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ConfigService } from '../../configuration/config/config.service';
import ConfigModel from '../../configuration/config/models/config-model';
import { ConfigType } from '../../configuration/config/models/config-type';
import { EnvironmentService } from '../../configuration/environment/environment.service';
import { TestPlanModel } from '../../configuration/testplan/models/TestPlanModel';
import { TestplanService } from '../../configuration/testplan/testplan.service';
import { CreateNotificationModel } from '../models/CreateNotificationModel';
import { CreateScheduleModel } from '../models/CreateScheduleModel';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create.schedule.component.html',
  styleUrls: ['./create.schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  testPlanId!: string;
  testPlanModel!: TestPlanModel;
  customerDetail!: CustomerDetail;
  environmentDetails!: ConfigModel[];
  resolutionStats: SelectModel[] = [
    { text: '1024x768', value: '1024x768' },
    { text: '1280x800', value: '1280x800' },
    { text: '1280x1024', value: '1280x1024' },
    { text: '1366x768', value: '1366x768' },
    { text: '1440x900', value: '1440x900' },
    { text: '1680x1050', value: '1680x1050' },
    { text: '1600x1200', value: '1600x1200' },
    { text: '1920x1200', value: '1920x1200' },
    { text: '1920x1080', value: '1920x1080' },
    { text: '2048x1536', value: '2048x1536' },
    { text: '2560x1440', value: '2560x1440' }
  ];
  supportedBrowserTypes: SelectModel[] = [
    {
      text: 'Google Chrome',
      value: BrowserType.Google_Chrome
    },
    {
      text: 'Internet Explorer',
      value: BrowserType.Internet_Explorer
    },
    {
      text: 'Mozilla Firefox',
      value: BrowserType.Mozilla_Firefox
    },
    {
      text: 'Opera',
      value: BrowserType.Opera
    },
    {
      text: 'Safari',
      value: BrowserType.Safari
    }
  ];

  scheduleFormControl = new FormGroup({
    environmentId: new FormControl('', Validators.required),
    recordVideo: new FormControl(true),
    disableScreenshot: new FormControl(false),
    captureNetworkTraffic: new FormControl(false),
    emailAddresses: new FormControl(''),
    browserType: new FormControl(
      BrowserType.Google_Chrome,
      Validators.required
    ),
    resolution: new FormControl('1920x1080', Validators.required),
    retryCount: new FormControl(0)
  });

  constructor(
    private testPlanService: TestplanService,
    private environmentService: EnvironmentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private customerService: CustomerService,
    private scheduleService: ScheduleService,
    private configService: ConfigService
  ) {
    route.params.subscribe((params) => {
      this.testPlanId = params.testplanid;
      this.customerService.getUserDetail().subscribe((res) => {
        this.customerDetail = res;
        this.getEnvironmentByUserId();
        this.getTestPlanDetail();
      });
    });
  }

  ngOnInit(): void {
  }

  getTestPlanDetail(): void {
    this.testPlanService
      .getTestPlanById(this.customerDetail.applicationId, this.testPlanId)
      .subscribe(
        (res) => {
          this.testPlanModel = res;
        },
        (err) => {
          this.snackbarService.openSnackBar('error loading test plans');
        }
      );
  }

  getEnvironmentByUserId(): void {
    this.configService
      .getConfigByAppId(
        this.customerDetail.applicationId,
        ConfigType.EnvironmentVariable
      )
      .subscribe({
        next: (res) => {
          this.environmentDetails = res;
        },
        error: (err) => {
          this.snackbarService.openSnackBar('error while loading environment');
        }
      });
    // this.environmentService
    //   .getEnvironment(this.customerDetail.userId)
    //   .subscribe(
    //     (res) => {
    //       this.environmentDetails = res;
    //     },
    //     (err) => {
    //       this.snackbarService.openSnackBar('error while loading environment');
    //     }
    //   );
  }

  createSchedule(): void {
    const createScheduleModel: CreateScheduleModel = {
      environmentId: this.scheduleFormControl.get('environmentId')?.value,
      userId: this.customerDetail.userId,
      isCaptureNetworkTraffic: this.scheduleFormControl.get(
        'captureNetworkTraffic'
      )?.value,
      isDisableScreenshot:
      this.scheduleFormControl.get('disableScreenshot')?.value,
      isRecordVideoEnabled: this.scheduleFormControl.get('recordVideo')?.value,
      browserType: this.scheduleFormControl.get('browserType')?.value,
      retryCount: this.scheduleFormControl.get('retryCount')?.value,
      resolution: this.scheduleFormControl.get('resolution')?.value
    };

    if (this.scheduleFormControl.get('emailAddresses')?.value) {
      const notificationModel: CreateNotificationModel = {
        emailAddress: this.scheduleFormControl.get('emailAddresses')?.value
      };
      createScheduleModel.notification = notificationModel;
    }
    this.scheduleService
      .createSchedule(
        this.customerDetail.applicationId,
        this.testPlanId,
        createScheduleModel
      )
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
