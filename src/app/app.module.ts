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
import { HomeComponent } from './automation/configuration/home/home.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, DashboardComponent, ScheduleComponent, GlobalvariableComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
