import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, FiledData, L1Reports, SubmissionReport } from 'app/core/types/submissionReport';

@Component({
  selector: 'ndw-l1-certification-report',
  templateUrl: './l1-certification-report.component.html',
  styleUrls: ['./l1-certification-report.component.sass', '../certification-report/certification-report.component.sass']
})
export class L1CertificationReportComponent implements OnInit {
  initialReports!: SubmissionReport;
  l1Reports: L1Reports[] = [];
  menuIsOpen!: boolean;
  tablesFilteredByFlag!: boolean;
  flagImgSrc: string = 'flag.png';
  sections: any;
  menuItems: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.initialReports = response.reportData;
      this.l1Reports = response.reportData.l1Reports;
      this.getMenuItems();
      this.getFilterReport();

    });
  }

  getFilterReport() {
    if (this.tablesFilteredByFlag) {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: FiledData) => {
          field.filterDataTable = field.dataTable?.filter((item: any) => (item.flag > 0))
        });
      });
    } else {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: FiledData) => {
          field.filterDataTable = field.dataTable;
        });
      });
    }
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

  private getMenuItems() {
    this.l1Reports.forEach(function (element: { [x: string]: any; }) {
      for (var key in element) {
        if (element[key] && element[key].length === 0) {
          delete element[key]
        }
      }
    });

    this.menuItems = this.l1Reports.map((report: any, index: number) => {
      if (report.fields.length !== 0) {
        this.sections = {
          title: report.fileName,
          tableNames: []
        };
        report.fields.forEach((field: any) => {

          if (field.dataTable.length !== 0) this.sections.tableNames.push(field.fieldName)
        });
        return this.sections;
      }

    })

  }

  camelize(str: string) {
    if (str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
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

  toggleFlagFilter() {
    this.tablesFilteredByFlag = !this.tablesFilteredByFlag;
    if (!this.tablesFilteredByFlag) {
      this.flagImgSrc = 'flag.png';
    } else {
      this.flagImgSrc = 'flag-yellow.png';
    }
    this.getFilterReport();
  }
  showLess(field: FiledData) {
    field.filterDataTable = field.dataTable?.filter((item:DataTable) => (item.flag > 0));
    field.showMore = true;
  }
  showMore(field: FiledData) {
    field.filterDataTable = field.dataTable;
    field.showMore = false;
  }
}
