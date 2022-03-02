import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './plans/plans.component';
import { PlanComponent } from './plan/plan.component';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'plans', component: PlansComponent },
  { path: 'plans/:id', component: PlanComponent },
  { path: 'clipboard', component: ClipboardComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
