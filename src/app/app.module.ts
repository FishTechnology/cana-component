import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './automation/schedule/schedule.component';
import { HomeComponent } from './automation/configuration/home/home.component';
import { GlobalvariableComponent } from './automation/configuration/globalvariable/globalvariable.component';
import { CreateGlobalVariableComponent } from './automation/configuration/globalvariable/createglobalvariable/createglobalvariable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CreateEnvironmentComponent } from './automation/configuration/environment/createenvironment/createenvironment.component';
import { EnvironmentComponent } from './automation/configuration/environment/environment.component';
import { CreateTestplanComponent } from './automation/configuration/testplan/createtestplan/createtestplan.component';
import { TestplanComponent } from './automation/configuration/testplan/testplan.component';
import { CreateTestcaseComponent } from './automation/configuration/testcase/createtestcase/createtestcase.component';
import { TestcaseComponent } from './automation/configuration/testcase/testcase.component';
import { CreateEnvironmentVariableComponent } from './automation/configuration/environmentvariable/createenvironmentvariable/createenvironmentvariable.component';
import { EnvironmentVariableComponent } from './automation/configuration/environmentvariable/environmentvariable.component';
import { ActionComponent } from './automation/configuration/action/action.component';
import { CreateActionComponent } from './automation/configuration/action/createaction/createaction.component';
import { ApiComponent } from './automation/configuration/action/createaction/types/api/api.component';
import { DatabaseComponent } from './automation/configuration/action/createaction/types/database/database.component';
import { UicontrolComponent } from './automation/configuration/action/createaction/types/uicontrol/uicontrol.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ScheduleComponent,
    HomeComponent,
    GlobalvariableComponent,
    CreateGlobalVariableComponent,
    EnvironmentComponent,
    CreateEnvironmentComponent,
    TestplanComponent,
    CreateTestplanComponent,
    TestcaseComponent,
    CreateTestcaseComponent,
    EnvironmentVariableComponent,
    CreateEnvironmentVariableComponent,
    ActionComponent,
    CreateActionComponent,
    ApiComponent,
    DatabaseComponent,
    UicontrolComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
