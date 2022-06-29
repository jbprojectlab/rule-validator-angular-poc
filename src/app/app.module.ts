import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlansComponent } from './pages/plans/plans.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PlanTableComponent } from './pages/plan/components/plan-table/plan-table.component';
import { CertificationReportComponent } from './pages/plan/components/certification-report/certification-report.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
// import { FormsModule,  } from '@angular/forms';
import { PlanFilterPipe } from './pages/plans/pipes/plan-filter.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,  MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
   
const MY_DATE_FORMATS = {
  parse: {
    dpInput: 'YYYYMM',
  },
  display: {
    dpInput: 'YYYYMM',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    PlansComponent,
    ClipboardComponent,
    DashboardComponent,
    PlanComponent,
    PlanTableComponent,
    CertificationReportComponent,
    PlanFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
