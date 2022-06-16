import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlansComponent } from './pages/plans/plans.component';
import { HomeComponent } from './pages/home/home.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PlanTableComponent } from './pages/plan/components/plan-table/plan-table.component';
import { CertificationReportComponent } from './pages/plan/components/certification-report/certification-report.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PlanFilterPipe } from './pages/plans/pipes/plan-filter.pipe';
import { DatepickerComponent } from './pages/plans/components/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    PlansComponent,
    HomeComponent,
    ClipboardComponent,
    DashboardComponent,
    PlanComponent,
    PlanTableComponent,
    CertificationReportComponent,
    PlanFilterPipe,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
