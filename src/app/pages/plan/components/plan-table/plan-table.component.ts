import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { l2CheckList, SubmissionReport } from 'app/core/types/submissionReport';
import { PlanTableService } from '../../services/plan-table.service'


@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.sass']
})
export class PlanTableComponent implements OnInit{
// showTableIcon: string = !isOpen ? 'show-more-blue' : 'show-less-blue'
private  destroyed$: Subject<boolean> = new Subject();
  reportData!: SubmissionReport;
  reports_:any =[]
  l2Checklist!: l2CheckList;
  isMenuOpen = false;
  menuItems: any = [];
  menuIsOpen: boolean = false;
  sections: any;
  
  constructor(private activatedRoute: ActivatedRoute, private planTableService: PlanTableService) { }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((response: any) => {
      this.reportData = response.reportData;
      this.l2Checklist = this.reportData.l2CheckList ;
      this.reports_ =this.l2Checklist.records
    });
    this.getMenuItems();
  }

  formatDecimalToPercent(decimal: number) {
    let number = String(decimal * 100)
    return parseFloat(number).toFixed(2) + '%';
  }

  private getMenuItems() {
    this.reports_.forEach(function(element: { [x: string]: any; }) {
      for (var key in element) {
        if (element[key] && element[key].length === 0) {
           delete element[key]
        }
      }
    });
    this.menuItems = this.reports_.map((report: any, index: number) => {
      this.sections={
        title: report.recordType,
        tableNames: []
      };
      this.sections.tableNames.push(this.sections.title)
      return this.sections;
    })
  }
  
  scrollToTable(reportName: string, lastTable: boolean, tableName?: string) {
    const table = tableName ? document.getElementById(`${tableName}`) : document.getElementById(`${reportName}`);
    if (table) {
      table.scrollIntoView(true);
      this.closeMenu();
      if (!lastTable) {
        document.body.scrollTop = document.body.scrollTop - 440;
      }
    }
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
  toggleMenu($event: { stopPropagation: () => void; }) {    
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
  @HostListener('click')onClick(){
    this.isMenuOpen = false;
  }

  approveReport(){
    let data = {
      "submissionId": "3000",
      "score": 0.4,
      "passFail": "Pass",
      "flag": 0.5,
      "l2cApprovedName": "Bappa",
      "l2cApprovedDate": "2022-07-28T08:14:35.155Z",
      "l2cErrorThresholdScore": 0.5
    }
    this.planTableService.updateReporter(data).subscribe(
      (response: any) => {
        this.l2Checklist.approvedUser = "Bappa";
        this.l2Checklist.approvedDate = "2022-07-28T08:14:35.155Z"
      }
    )
    
  }

}
