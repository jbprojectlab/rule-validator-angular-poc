import { Component, HostListener, OnInit } from '@angular/core';
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
  private  destroyed$: Subject<boolean> = new Subject();
  reportData!: SubmissionReport;
  reports_:any =[]
  l2Checklist!: l2CheckList;
  menuItems: any = [];
  menuIsOpen: boolean = false;
  sections: any;
  active:number = -1
  
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
    if (this.menuIsOpen) {
      this.menuIsOpen = false;
    }
  }
  toggleMenu($event: { stopPropagation: () => void; }) {    
    $event.stopPropagation();
    this.menuIsOpen = !this.menuIsOpen;
  }
  @HostListener('window:click', ['$event'])onClicK(e: any){
    if (this.menuIsOpen) {
      this.menuIsOpen = false;
    }
    this.closeRow(e.target.localName)
  }

  approveReport(){
    let data = {
      "submissionId": this.reportData.submissionId,
      "score": this.reportData.totalScore,
      "passFail": this.reportData.totalPassFail,
      "flag": this.reportData.totalFlag,
      "l2cApprovedName": localStorage.getItem("profile"),
      "l2cApprovedDate": new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString(),
      "l2cErrorThresholdScore": this.l2Checklist.errorThresholdReportScore
    }
    this.planTableService.updateReporter(data).subscribe(
      (response: any) => {
        this.l2Checklist.approvedUser = response.l2cApprovedName;
        this.l2Checklist.approvedDate = response.l2cApprovedDate;
      }
    )
    
  }

  openRow(index: number, e:any){
      this.active = this.active === index ? -1 : index;
  }

  closeRow(el: string){
    if(el !== 'td') this.active = -1;
  }

}
