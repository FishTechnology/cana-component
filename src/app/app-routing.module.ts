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
import { ConditionListComponent } from './automation/configuration/condition/condition-list/condition-list.component';
import { ConditionCreateComponent } from './automation/configuration/condition/condition-create/condition-create.component';
import { TestcaseMappingComponent } from './automation/configuration/testcase/testcase-mapping/testcase-mapping.component';
import { AddTestcaseComponent } from './automation/configuration/testcase/add-testcase/add-testcase.component';
import { HtmlEditorComponent } from './commons/html-editor/html-editor.component';

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
      {
        path: 'testcases/:testcaseid/conditions',
        component: ConditionListComponent,
      },
      {
        path: 'testcases/:testcaseid/conditions/create',
        component: ConditionCreateComponent,
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
    path: 'testplans/:testplanid/testcases/mapping',
    component: TestcaseMappingComponent,
  },
  {
    path: 'testplans/testcases/:testcaseid/addtestcase',
    component: AddTestcaseComponent,
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
  {
    path: 'htmleditor',
    component: HtmlEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
