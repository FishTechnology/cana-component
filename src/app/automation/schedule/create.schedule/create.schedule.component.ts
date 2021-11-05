import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { EnvironmentService } from '../../configuration/environment/environment.service';
import { EnvironmentModel } from '../../configuration/environment/models/EnvironmentModel';
import { TestPlanModel } from '../../configuration/testplan/models/TestPlanModel';
import { TestplanService } from '../../configuration/testplan/testplan.service';
import { CreateScheduleModel } from '../models/CreateScheduleModel';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create.schedule.component.html',
  styleUrls: ['./create.schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit {
  testPlanId!: number;
  testPlanModel!: TestPlanModel;
  customerDetail!: CustomerDetail;
  environmentDetails!: EnvironmentModel[];
  scheduleFormControl = new FormGroup({
    environmenId: new FormControl('', Validators.required),
    recordVideo: new FormControl(true),
    disableScreenshot: new FormControl(false),
    captureNetworkTraffic: new FormControl(false),
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
    };

    this.scheduleService
      .createSchedule(this.testPlanId, createScheduleModel)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar('successfully created schedule');
          this.router.navigate(['/schedules']);
        },
        (err) => {
          this.snackbarService.openSnackBar('error while creating schedule');
        }
      );
  }
}
