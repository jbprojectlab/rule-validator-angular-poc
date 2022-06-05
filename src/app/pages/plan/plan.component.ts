import { Component } from '@angular/core';
import mockPlan, { mockPlanDescription } from './mock-plan'

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass']
})
export class PlanComponent {
  planDescription: any = mockPlanDescription;
  plan: any = mockPlan;
  visibleTab: number = 1;
  level2ChecklistIsOpen: boolean = true;
  rejectsTableIsOpen: boolean = false;
  transformationsTableIsOpen: boolean = false;
  analyticalWarningsTableIsOpen: boolean = false;
  panelTop: boolean = false;

  constructor() { }

  selectTab(tab: number) {
    this.visibleTab = tab;
  }

  getTabIconSrc(tab: number) {
    if (tab === 1) {
      return this.visibleTab === 1 ? 'assets/img/graph-white.png' : 'assets/img/graph-black.png';
    } else if (tab === 2) {
      return this.visibleTab === 2 ? 'assets/img/checklist-white.png' : 'assets/img/checklist-black.png';
    }
    return undefined;
  }

  toggleCheckList2() {
    this.level2ChecklistIsOpen = !this.level2ChecklistIsOpen;
  }

  toggleChecklist(checklistNumber: number) {
    if (checklistNumber === 2) {
      this.toggleCheckList2();
    }
  }

  toggleRejectsTable() {
    this.rejectsTableIsOpen = !this.rejectsTableIsOpen;
  }

  toggleTransformationsTable() {
    this.transformationsTableIsOpen = !this.transformationsTableIsOpen;
  }

  toggleAnalyticalWarningsTable() {
    this.analyticalWarningsTableIsOpen = !this.analyticalWarningsTableIsOpen;
  }

  toggleTable(title: string) {
    if (title === 'Rejects') {
      this.toggleRejectsTable();
    } else if (title === 'Transformations') {
      this.toggleTransformationsTable();
    } else if (title === 'Analytical Warnings') {
      this.toggleAnalyticalWarningsTable();
    }
  }

  ngOnInit(): void {
    document.body.addEventListener('scroll', (e: any) => {
      if(document.body.scrollTop > 20) {
        this.panelTop = true;
      } else {
        this.panelTop = false;
      }
    })
  }
}
