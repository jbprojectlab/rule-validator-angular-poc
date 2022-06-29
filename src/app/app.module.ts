import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PlanFilterPipe } from './pages/plans/pipes/plan-filter.pipe';
import { L1CertificationReportComponent } from './pages/plan/components/l1-certification-report/l1-certification-report.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorHandlerInterceptor } from './core/interceptors/http-error-handler.interceptor';

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
    L1CertificationReportComponent,
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
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    },
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
