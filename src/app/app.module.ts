import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './automation/schedule/schedule.component';
import { GlobalvariableComponent } from './automation/configuration/globalvariable/globalvariable.component';
import { HomeComponent } from './automation/configuration/home/home.component';
import { CreateGlobalVariableComponent } from './automation/configuration/globalvariable/createglobalvariable/createglobalvariable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CreateEnvironmentComponent } from './automation/configuration/environment/createenvironment/createenvironment.component';
import { EnvironmentComponent } from './automation/configuration/environment/environment.component';
import { EnvironmentVariableComponent } from './automation/configuration/environmentvariable/environmentvariable.component';
import { CreateEnvironmentVariableComponent } from './automation/configuration/environmentvariable/createenvironmentvariable/createenvironmentvariable.component';
import { CreateTestplanComponent } from './automation/configuration/testplan/createtestplan/createtestplan.component';
import { TestplanComponent } from './automation/configuration/testplan/testplan.component';
import { CreateTestcaseComponent } from './automation/configuration/testcase/createtestcase/createtestcase.component';
import { TestcaseComponent } from './automation/configuration/testcase/testcase.component';
import { ActionComponent } from './automation/configuration/action/action.component';
import { CreateActionComponent } from './automation/configuration/action/createaction/createaction.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UicontrolComponent } from './automation/configuration/action/createaction/types/uicontrol/uicontrol.component';
import { ApiComponent } from './automation/configuration/action/createaction/types/api/api.component';
import { DatabaseComponent } from './automation/configuration/action/createaction/types/database/database.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ScheduleComponent,
    GlobalvariableComponent,
    HomeComponent,
    CreateGlobalVariableComponent,
    CreateEnvironmentComponent,
    EnvironmentComponent,
    EnvironmentVariableComponent,
    CreateEnvironmentVariableComponent,
    CreateTestplanComponent,
    TestplanComponent,
    CreateTestcaseComponent,
    TestcaseComponent,
    ActionComponent,
    CreateActionComponent,
    UicontrolComponent,
    ApiComponent,
    DatabaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
