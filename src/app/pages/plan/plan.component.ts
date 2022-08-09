import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { l2CheckList, SubmissionReport } from 'app/core/types/submissionReport';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import mockPlan from './mock-plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass']
})
export class PlanComponent implements OnInit, OnDestroy {
  private  destroyed$: Subject<boolean> = new Subject();
  plan: any = mockPlan;
  visibleTab: number = 1;
  level2ChecklistIsOpen: boolean = true;
  rejectsTableIsOpen: boolean = false;
  transformationsTableIsOpen: boolean = false;
  analyticalWarningsTableIsOpen: boolean = false;
  panelTop: boolean = false;
  reportData!: SubmissionReport;
  l2Checklist!: l2CheckList;
  constructor(private activatedRoute: ActivatedRoute
  ) { }

  selectTab(tab: number) {
    this.visibleTab = tab;
  }

  getTabIconSrc(tab: number) {
    if (tab === 1) {
      return this.visibleTab === 1 ? 'assets/img/checklist-white.png' : 'assets/img/checklist-black.png';
    } else if (tab === 2) {
      return this.visibleTab === 2 ? 'assets/img/checklist-white.png' : 'assets/img/checklist-black.png';
    } else if (tab === 3) {
      return this.visibleTab === 3 ? 'assets/img/checklist-white.png' : 'assets/img/checklist-black.png';
    } else {
      return this.visibleTab === 4 ? 'assets/img/checklist-white.png' : 'assets/img/checklist-black.png';
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
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((response: any) => {
      this.reportData = response.reportData;
      this.l2Checklist = this.reportData.l2CheckList;
    });
    document.body.addEventListener('scroll', (e: any) => {
      if (document.body.scrollTop > 20) {
        this.panelTop = true;
      } else {
        this.panelTop = false;
      }
    })
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
