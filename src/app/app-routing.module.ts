import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./automation/configuration/home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GlobalvariableComponent } from "./automation/configuration/globalvariable/globalvariable.component";
import { EnvironmentComponent } from "./automation/configuration/environment/environment.component";
import { EnvironmentvariableComponent } from "./automation/configuration/environmentvariable/environmentvariable.component";
import { TestplanComponent } from "./automation/configuration/testplan/testplan.component";
import { TestcaseComponent } from "./automation/configuration/testcase/testcase.component";
import { TestcasecontrolComponent } from "./automation/configuration/testcasecontrol/testcasecontrol.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "configuration",
    component: HomeComponent,
    children: [
      {
        path: "globalvariable",
        component: GlobalvariableComponent,
      },
      {
        path: "environment",
        component: EnvironmentComponent,
      },
      {
        path: "environmentvariable",
        component: EnvironmentvariableComponent,
      },
      {
        path: "testplan",
        component: TestplanComponent,
      },
      {
        path: "testcase",
        component: TestcaseComponent,
      },
      {
        path: "action",
        component: TestcasecontrolComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
