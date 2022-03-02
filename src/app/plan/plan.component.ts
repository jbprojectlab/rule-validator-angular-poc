import { Component, OnInit } from '@angular/core';
import mockPlan, { mockPlanDescription } from './mock-plan'

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass']
})
export class PlanComponent implements OnInit {
  planDescription: any = mockPlanDescription;
  plan: any = mockPlan;

  constructor() { }

  ngOnInit(): void {
    console.log(this.plan)
    // this.planDescription = mockPlanDescription
    // this.plan = mockPlan
  }

}
