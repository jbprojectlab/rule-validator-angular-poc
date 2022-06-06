import { Component, OnInit } from '@angular/core';
import reportData from './L2-cert-report-data.json';

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  initialReports: any = reportData.l2Reports;
  reports: any = this.initialReports;
  totalFlag: number = reportData.totalFlag;
  totalPassFail: string = reportData.totalPassFail;
  score: number = reportData.totalScore;
  menuItems: any = [];
  menuIsOpen: boolean = false;
  tablesFilteredByFlag: boolean = false;
  flagImgSrc: string = 'flag.png';
  expandedTables: any[] = []

  openMenu() {
    if(!this.menuIsOpen) {
      this.menuIsOpen = true;
    }
  }

  closeMenu() {
    if(this.menuIsOpen) {
      this.menuIsOpen = false;
    }
  }

  initializeExpandedTables() {
    this.expandedTables = this.reports.map((report: any, index: number) => {
      let expandedState: any = {}
      if(report.metricTable) expandedState.metricTable = true
      if(report.financialSummary) expandedState.financialSummary = true
      if(report.rxTable) expandedState.rxTable = true
      if(report.frequencyCountTable) expandedState.frequencyCountTable = true
      return expandedState
    })
  }

  resetFilter() {
    this.reports = this.initialReports
    this.tablesFilteredByFlag = false;
    this.initializeExpandedTables()
  }

  filterTablesByFlag() {
    this.expandedTables = this.reports.map((report: any, index: number) => {
      let expandedState: any = {}
      if(report.metricTable) expandedState.metricTable = false
      if(report.financialSummary) expandedState.financialSummary = false
      if(report.rxTable) expandedState.rxTable = false
      if(report.frequencyCountTable) expandedState.frequencyCountTable = false
      return expandedState
    })
    this.tablesFilteredByFlag = true
  }

  toggleFlagFilter() {
    if(this.tablesFilteredByFlag) {
      this.flagImgSrc = 'flag.png';
      this.resetFilter();
    } else {
      this.flagImgSrc = 'flag-yellow.png';
      this.filterTablesByFlag();
    }
  }

  showMore(i: number, table: string) {
    if(!this.expandedTables[i][table]) {
      this.expandedTables[i][table] = true
    }
  }
  
  showLess(i: number, table: string) {
    if(this.expandedTables[i][table]) {
      this.expandedTables[i][table] = false
    }
  }

  getMenuItems() {
    this.menuItems = this.reports.map((report: any, index: number) => {
      console.log(report.fileName)
      let sections: any = {
        title: report.fileName,
        tableNames: []
      }
      if(report.metricTable) sections.tableNames.push('Metric Table')
      if(report.financialSummary) sections.tableNames.push('Financial Summary')
      if(report.rxTable) sections.tableNames.push('Rx Table')
      if(report.frequencyCountTable) sections.tableNames.push('Frequency Count Table')
      return sections
    })
  }

  camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    }).replace(/\s+/g, '')
  }

  scrollToTable(reportName: string, lastTable: boolean, tableName?: string) {
    const table = tableName ? document.getElementById(`item-${reportName}-${tableName}`) : document.getElementById(`item-${reportName}`);
    if(table) {
      table.scrollIntoView(true);
      this.closeMenu();
      if(!lastTable) {
        document.body.scrollTop = document.body.scrollTop - 440;
      };
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.getMenuItems();
    console.log('this.menuItems:  ', this.menuItems);
    this.initializeExpandedTables();
  }
}
