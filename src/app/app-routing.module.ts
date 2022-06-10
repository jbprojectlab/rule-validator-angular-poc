import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanComponent } from './pages/plan/plan.component';
import { ClipboardComponent } from './pages/clipboard/clipboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'plans', component: PlansComponent },
  { path: 'plans/:submissionId/:submissionType', component: PlanComponent },
  { path: 'clipboard', component: ClipboardComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
