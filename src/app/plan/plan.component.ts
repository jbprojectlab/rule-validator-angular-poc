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
  level2ChecklistIsOpen: boolean = false

  toggleCheckList2() {
    this.level2ChecklistIsOpen = !this.level2ChecklistIsOpen
  }

  toggleChecklist(checklistNumber: number) {
    if(checklistNumber === 2) {
      this.toggleCheckList2()
    }
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.plan)
  }

}
