import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanComponent } from './pages/plan/plan.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CertificationReportResolversService } from './pages/plan/services/certification-report-resolvers.service';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: 'plans', component: PlansComponent, canActivate: [ OktaAuthGuard ] },
  { path: '', redirectTo: 'plans', pathMatch:'full' },
  { path: 'plans/:submissionId/:submissionType', 
    component: PlanComponent ,
    resolve: { reportData: CertificationReportResolversService },
    canActivate: [OktaAuthGuard]
  },
  { path: 'clipboard', component: ClipboardComponent, canActivate: [OktaAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [OktaAuthGuard]  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
