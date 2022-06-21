import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { L2Report, MatricTableData, SubmissionReport } from 'app/core/types/submissionReport';
import { ActivatedRoute } from '@angular/router';
import { CertificationReportsService } from '../../services/certification-reports.service';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit, OnDestroy {
  initialReports!: SubmissionReport;
  reports: L2Report[] = [];
  metricTable: MatricTableData[] =[];
  menuItems: any = [];
  menuIsOpen: boolean = false;
  tablesFilteredByFlag: boolean = false;
  flagImgSrc: string = 'flag.png';
  expandedTables: any[] = [];
  destroyed$: Subject<boolean> = new Subject();
  showScore = false;
  scoreContainer: any;

  private submissionId!: string;
  private submissionType!: string;
  sections: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificationReportsService: CertificationReportsService
  ) {
    this.submissionId = activatedRoute.snapshot.params['submissionId'];
    this.submissionType = activatedRoute.snapshot.params['submissionType'];
   }

  ngOnInit(): void {
    this.getCertificationReportData();
    this.metricTable.forEach((_covenants) => {
      _covenants.expandScore = false;
    });
  }

  openMenu() {
    if (!this.menuIsOpen) {
      this.menuIsOpen = true;
    }
  }

  closeMenu() {
    if (this.menuIsOpen) {
      this.menuIsOpen = false;
    }
  }

  initializeExpandedTables() {
    this.expandedTables = this.reports.map((report: any, index: number) => {
      let expandedState: any = {};
      if (report.metricTable) expandedState.metricTable = true;
      if (report.financialSummary) expandedState.financialSummary = true;
      if (report.frxTable) expandedState.frxTable = true;
      if (report.frequencyCountTable) expandedState.frequencyCountTable = true;
      return expandedState;
    })
  }

  resetFilter() {
    this.reports = this.initialReports?.l2Reports;
    this.tablesFilteredByFlag = false;
    this.initializeExpandedTables();
  }

  filterTablesByFlag() {
    this.expandedTables = this.reports.map((report: any, index: number) => {
      let expandedState: any = {};
      if (report.metricTable) expandedState.metricTable = false;
      if (report.financialSummary) expandedState.financialSummary = false;
      if (report.frxTable) expandedState.frxTable = false;
      if (report.frequencyCountTable) expandedState.frequencyCountTable = false;
      return expandedState;
    })
    this.tablesFilteredByFlag = true;
  }

  toggleFlagFilter() {
    if (this.tablesFilteredByFlag) {
      this.flagImgSrc = 'flag.png';
      this.resetFilter();
    } else {
      this.flagImgSrc = 'flag-yellow.png';
      this.filterTablesByFlag();
    }
  }

  showMore(i: number, table: string) {
    if (!this.expandedTables[i][table]) {
      this.expandedTables[i][table] = true;
    }
  }
  
  showLess(i: number, table: string) {
    if (this.expandedTables[i][table]) {
      this.expandedTables[i][table] = false;
    }
  }

  getMenuItems() {
    this.reports.forEach(function(element: { [x: string]: any; }) {
      for (var key in element) {
        if (element[key] && element[key].length === 0) {
           delete element[key]
        }
      }
    });

    this.menuItems = this.reports.map((report: any, index: number) => {  
      this.sections={
        title: report.fileName,
        tableNames: []
      };

      if (report.metricTable) this.sections.tableNames.push('Metric Table');
      if (report.financialSummary) this.sections.tableNames.push('Financial Summary');
      if (report.frxTable) this.sections.tableNames.push('Rx Table');
      if (report.frequencyCountTable) this.sections.tableNames.push('Frequency Count Table');
      return this.sections;
    })
  }

  camelize(str: string) {
    if(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
    } else {
      return '';
    }
  }

  scrollToTable(reportName: string, lastTable: boolean, tableName?: string) {
    const table = tableName ? document.getElementById(`item-${reportName}-${tableName}`) : document.getElementById(`item-${reportName}`);
    if (table) {
      table.scrollIntoView(true);
      this.closeMenu();
      if (!lastTable) {
        document.body.scrollTop = document.body.scrollTop - 440;
      }
    }
  }

  // expandScore(row:any){
  //   console.log(row)
  //   var coll = document.getElementsByClassName("collapsible");
  // }

  public getCertificationReportData() {
    this.certificationReportsService.getCertificationReportData(this.submissionId, this.submissionType)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data: SubmissionReport) => {
        this.initialReports = data;
        this.reports = (data && data) ? data.l2Reports : [];
        this.getMenuItems();
        this.initializeExpandedTables();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
