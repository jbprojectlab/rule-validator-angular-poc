import { Component, OnInit, OnDestroy } from '@angular/core';
import { CertificationReportsService } from './services/certification-reports.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { L2Report, SubmissionReport } from 'app/core/types/submissionReport';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit, OnDestroy {
  initialReports!: SubmissionReport;
  reports: L2Report[] = [];
  menuItems: any = [];
  menuIsOpen: boolean = false;
  tablesFilteredByFlag: boolean = false;
  flagImgSrc: string = 'flag.png';
  expandedTables: any[] = [];
  destroyed$: Subject<boolean> = new Subject();

  private submissionId!: string;
  private submissionType!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private certificationReportsService: CertificationReportsService
  ) {
    this.submissionId = activatedRoute.snapshot.params['submissionId'];
    this.submissionType = activatedRoute.snapshot.params['submissionType'];
   }

  ngOnInit(): void {
    this.certificationReportsService.getCertificationReportData(this.submissionId, this.submissionType)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data: SubmissionReport) => {
        this.initialReports = data;
        this.reports = (data && data) ? data.l2Reports : [];
        this.getMenuItems();
        this.initializeExpandedTables();
    })
    
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
      if (report.rxTable) expandedState.rxTable = true;
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
      if (report.rxTable) expandedState.rxTable = false;
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
    this.menuItems = this.reports.map((report: any, index: number) => {
      let sections: any = {
        title: report.fileName,
        tableNames: []
      };
      if (report.metricTable) sections.tableNames.push('Metric Table');
      if (report.financialSummary) sections.tableNames.push('Financial Summary');
      if (report.rxTable) sections.tableNames.push('Rx Table');
      if (report.frequencyCountTable) sections.tableNames.push('Frequency Count Table');
      return sections;
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

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
