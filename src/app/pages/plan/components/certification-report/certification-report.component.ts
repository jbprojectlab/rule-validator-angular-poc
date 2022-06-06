import { Component, OnInit } from '@angular/core';
import productData from './product-data.json';
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
  panelTop: boolean = false;
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

  filterTablesByProduct(title: string) {
  }

  filterTablesByTable(title: string, tableIdx: number) {
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

  productHasTables(product: any) {
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
  }

  scrollToTable(productIdx: number, tableIdx: number, lastTable: boolean) {
  }

  constructor() { }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.initializeExpandedTables()
    console.log('expandedTables:  ', this.expandedTables)
  }
}
