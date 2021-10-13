import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { MaterialModule } from "./material/material.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ScheduleComponent } from "./automation/schedule/schedule.component";
import { GlobalvariableComponent } from "./automation/configuration/globalvariable/globalvariable.component";
import { HomeComponent } from "./automation/configuration/home/home.component";
import { CreateGlobalVariableComponent } from "./automation/configuration/globalvariable/createglobalvariable/createglobalvariable.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

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
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
