import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionComponent } from './automation/configuration/action/action.component';
import { CreateActionComponent } from './automation/configuration/action/createaction/createaction.component';
import { ApplicationComponent } from './automation/configuration/application/application.component';
import { ApplicationconfigComponent } from './automation/configuration/application/applicationconfig/applicationconfig.component';
import { EnvironmentComponent } from './automation/configuration/environment/environment.component';
import { EnvironmentVariableComponent } from './automation/configuration/environment/environmentvariable/environmentvariable.component';
import { GlobalvariableComponent } from './automation/configuration/globalvariable/globalvariable.component';
import { HomeComponent } from './automation/configuration/home/home.component';
import { TestcaseComponent } from './automation/configuration/testcase/testcase.component';
import { TestplanComponent } from './automation/configuration/testplan/testplan.component';
import { CreateScheduleComponent } from './automation/schedule/create.schedule/create.schedule.component';
import { ScheduleComponent } from './automation/schedule/schedule.component';
import { ScheduleIterationHistoryComponent } from './automation/schedule/scheduleiteration/scheduleiterationhistory/scheduleiterationhistory.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'configuration',
    component: HomeComponent,
    children: [
      {
        path: 'globalvariables',
        component: GlobalvariableComponent,
      },
      {
        path: 'environments',
        component: EnvironmentComponent,
      },
      {
        path: 'applications',
        component: ApplicationComponent,
      },
      {
        path: 'applications/:applicationid/applicationconfigs',
        component: ApplicationconfigComponent,
      },
      {
        path: 'environments/:environmentid/environmentvariables',
        component: EnvironmentVariableComponent,
      },
      {
        path: 'testplans',
        component: TestplanComponent,
      },
      {
        path: 'testcases',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases/:testcaseid',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases',
        component: TestcaseComponent,
      },
      {
        path: 'testplans/:testplanid/testcases/:testcaseid/actions',
        component: ActionComponent,
      },
      {
        path: 'testcases/:testcaseid/actions',
        component: ActionComponent,
      },
      {
        path: 'schedules',
        component: ScheduleComponent,
      },
    ],
  },
  {
    path: 'configuration/testcases/:testcaseid/actions/create',
    component: CreateActionComponent,
  },
  {
    path: 'configuration/testplans/:testplanid/testcases/:testcaseid/actions/create',
    component: CreateActionComponent,
  },
  {
    path: 'testplans/:testplanid/schedules',
    component: CreateScheduleComponent,
  },
  {
    path: 'schedules/:scheduleid/scheduleiterations/:scheduleiterationid/histories',
    component: ScheduleIterationHistoryComponent,
  },
  {
    path: 'schedules',
    component: ScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
