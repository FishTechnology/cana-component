import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './automation/configuration/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalvariableComponent } from './automation/configuration/globalvariable/globalvariable.component';
import { EnvironmentComponent } from './automation/configuration/environment/environment.component';
import { EnvironmentVariableComponent } from './automation/configuration/environmentvariable/environmentvariable.component';
import { TestplanComponent } from './automation/configuration/testplan/testplan.component';
import { TestcaseComponent } from './automation/configuration/testcase/testcase.component';
import { ActionComponent } from './automation/configuration/action/action.component';

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
        path: 'environmentvariables',
        component: EnvironmentVariableComponent,
      },
      {
        path: 'testplan',
        component: TestplanComponent,
      },
      {
        path: 'testcase',
        component: TestcaseComponent,
      },
      {
        path: 'testcase/:testcaseid',
        component: TestcaseComponent,
      },
      {
        path: 'action',
        component: ActionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
