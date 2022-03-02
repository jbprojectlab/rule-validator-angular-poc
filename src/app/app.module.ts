import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlansComponent } from './plans/plans.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SelectComponent } from './select/select.component';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { PlanTableComponent } from './plan-table/plan-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PlansComponent,
    HomeComponent,
    NavbarComponent,
    SelectComponent,
    ClipboardComponent,
    DashboardComponent,
    PlanComponent,
    PlanTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
