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
import { FieldDistributorReportComponent } from './pages/plan/components/field-distributor-report/field-distributor-report.component';
import { BaseReportComponent } from './pages/plan/components/base-report/base-report.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

const config = {
  issuer: 'https://dev-88074172.okta.com/oauth2/default',
  clientId: '0oa5tknywtLiDURf95d7',
  redirectUri: window.location.origin + '/login/callback',
};
const oktaAuth = new OktaAuth(config);

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
    FieldDistributorReportComponent,
    BaseReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OktaAuthModule,
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
    MatSnackBarModule,
    OverlayModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    },
    { 
      provide: OKTA_CONFIG, 
      useValue: { oktaAuth } 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MatNativeDateModule,
    MatSnackBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
