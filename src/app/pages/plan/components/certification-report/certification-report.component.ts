import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FinancialSummary, L2Report, MetricTableData, SubmissionReport } from 'app/core/types/submissionReport';
import { ActivatedRoute } from '@angular/router';
import { BaseReportComponent } from '../base-report/base-report.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass'],
})
export class CertificationReportComponent extends BaseReportComponent implements OnInit{
  initialReports!: SubmissionReport;
  reports: L2Report[] = [];
  metricTable: MetricTableData[] =[];
  menuItems: any = [];
  tablesFilteredByFlag: boolean = false;
  windowScrolled = false;
  flagImgSrc: string = 'flag.png';
  expandedTables: any[] = [];
  showScore = false;
  scoreContainer: any;
  sections: any;
  isShowMore: boolean = false;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  month: string='';

  constructor(private activatedRoute: ActivatedRoute) {
    super()
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((response: any) => {
      this.initialReports = response.reportData;
      this.reports = (this.initialReports && this.initialReports) ? this.initialReports.l2Reports : [];
      this.getMenuItems();
      this.initializeExpandedTables();
    });

    this.metricTable.forEach((row) => {
      row.computedValueExpanded = false;
    })
  }

  expandComputedValue(reportIdx: number, rowIdx: number, row:any) {
    // @ts-ignore
    this.reports[reportIdx].metricTable[rowIdx].computedValueExpanded = this.reports[reportIdx].metricTable[rowIdx].computedValueExpanded ? false : true
    let valuemonths: string[]=[];
    let valueHistoryMonths = row.valueHistory
    valueHistoryMonths.forEach((element:any) => {
      if(element.cycleId) {
        const monthIdx = Number(element.cycleId.substring(4,6)) - 1
        this.month = this.months[monthIdx]
        valuemonths.push(this.month)
      }
    });
    // @ts-ignore
    this.reports[reportIdx].metricTable[rowIdx].historyPeriod = `${valuemonths[0]} - ${valuemonths[valuemonths.length-1]}`

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
    this.expandedTables = this.reports.map((report: any) => {
      let expandedState: any = {};
      if (report.metricTable) {
        expandedState.metricTable = false;
        expandedState.metricTableTotalCount = report.metricTable.length;
        expandedState.metricTableFlagCount = report.metricTable.reduce((previous: number, data: any, ) => previous + data.flag, 0)
        this.isShowMore = expandedState.metricTableTotalCount > expandedState.metricTableFlagCount ?  true : false;
      }
      if (report.financialSummary) {
        expandedState.financialSummary = false;
        expandedState.financialSummaryTotalCount = report.financialSummary.length;
        expandedState.financialSummaryFlagCount = report.financialSummary
        .reduce((previous: number, data: any, ) => previous + data.flag, expandedState.flagCount || 0);
        this.isShowMore = expandedState.financialSummaryTotalCount > expandedState.financialSummaryFlagCount ?  true : false;
      }
      if (report.frxTable) {
        expandedState.frxTable = false;
        expandedState.frxTableTotalCount = report.frxTable.length;
        expandedState.frxTableFlagCount = report.frxTable.reduce((previous: number, data: any, ) => previous + data.flag, 0)
        this.isShowMore = expandedState.frxTableTotalCount > expandedState.frxTableFlagCount ?  true : false;
      }
      if (report.frequencyCountTable) {
        expandedState.frequencyCountTable = false;
        expandedState.frequencyCountTableTotalCount = report.frequencyCountTable.length;
        expandedState.frequencyCountTableFlagCount = report.frequencyCountTable.reduce((previous: number, data: any, ) => previous + data.flag, 0)
        this.isShowMore = expandedState.frequencyCountTableTotalCount > expandedState.frequencyCountTableFlagCount ?  true : false;
      }
      expandedState.flagCount = expandedState.metricTableFlagCount || 0 + expandedState.financialSummaryFlagCount || 0
        + expandedState.frxTableFlagCount || 0 + expandedState.frequencyCountTableFlagCount || 0;
      expandedState.tableCountStatus = expandedState.flagCount > 0 ? false : true;
      expandedState.tableTotalCount = expandedState.metricTableTotalCount || 0 + expandedState.financialSummaryTotalCount || 0 +
        expandedState.frxTableTotalCount || 0 + expandedState.frequencyCountTableTotalCount || 0;
      return expandedState;
    })
    this.tablesFilteredByFlag = true;
    this.isShowMore = true;
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

  formatCycleId(cycleId: string) {
    if(cycleId) {
      const monthIdx = Number(cycleId.substring(4,6)) - 1
      const month = this.months[monthIdx]
      const year = cycleId.substring(2,4)
      return month + ' ' + year
    } else {
      return ''
    }
  }

  displayColoumEnable(summaryData: FinancialSummary[], fieldName: string): boolean {
    let flag = false;
    if (summaryData?.length!==0 && (fieldName === 'totalAmountExcludingDeniedSecondary' || fieldName === 'totalAmountOutpatientFacilityOnly' || fieldName === 'estimatedAveragePerValidScript')) {
      flag = summaryData[0][fieldName] !== 0;
    }
    return flag
  }
  @HostListener("window:scroll", [])scrollHandler($event: any){
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
}
