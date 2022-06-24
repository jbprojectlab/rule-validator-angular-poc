import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanComponent } from './pages/plan/plan.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CertificationReportResolversService } from './pages/plan/services/certification-report-resolvers.service';

const routes: Routes = [
  { path: '', redirectTo: 'plans', pathMatch:'full'},
  { path: 'plans', component: PlansComponent },
  { path: 'plans/:submissionId/:submissionType', 
  component: PlanComponent ,
  resolve: { reportData: CertificationReportResolversService }},
  { path: 'clipboard', component: ClipboardComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
