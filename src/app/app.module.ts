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
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserComponent } from './automation/configuration/action/createaction/types/uicontrol/browser/browser.component';
import { BrowserReadonlyComponent } from './automation/configuration/action/createaction/types/uicontrol/browser/browserreadonly/browser.readonly.component';
import { UiControlReadonlyComponent } from './automation/configuration/action/createaction/types/uicontrol/uicontrol.readonly/uicontrol.readonly.component';
import { CreateScheduleComponent } from './automation/schedule/create.schedule/create.schedule.component';
import { ScheduleIterationComponent } from './automation/schedule/scheduleiteration/scheduleiteration.component';
import { ReplaceNullWithTextPipe } from './commons/pipes/replacenullwithtext/replacenullwithtext.pipe';
import { ScheduleIterationHistoryComponent } from './automation/schedule/scheduleiteration/scheduleiterationhistory/scheduleiterationhistory.component';
import { CtlOptionsAutocompleteComponent } from './commons/ctloptionsautocomplete/ctloptionsautocomplete.component';
import { ApplicationComponent } from './automation/configuration/application/application.component';
import { ApplicationconfigComponent } from './automation/configuration/application/applicationconfig/applicationconfig.component';
import { CreateApplicationComponent } from './automation/configuration/application/create-application/create-application.component';
import { CreateApplicationConfigComponent } from './automation/configuration/application/applicationconfig/create-application-config/create-application-config.component';

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
    BrowserComponent,
    BrowserReadonlyComponent,
    UiControlReadonlyComponent,
    CreateScheduleComponent,
    ScheduleIterationComponent,
    ReplaceNullWithTextPipe,
    ScheduleIterationHistoryComponent,
    CtlOptionsAutocompleteComponent,
    ApplicationComponent,
    ApplicationconfigComponent,
    CreateApplicationComponent,
    CreateApplicationConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
