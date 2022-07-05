import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, FiledData, L1Reports, SubmissionReport } from 'app/core/types/submissionReport';
import { takeUntil } from 'rxjs/operators';
import { BaseReportComponent } from '../base-report/base-report.component';

@Component({
  selector: 'app-l1-certification-report',
  templateUrl: './l1-certification-report.component.html',
  styleUrls: ['./l1-certification-report.component.sass', '../certification-report/certification-report.component.sass']
})
export class L1CertificationReportComponent extends BaseReportComponent implements OnInit {
  initialReports!: SubmissionReport;
  l1Reports: L1Reports[] = [];
  tablesFilteredByFlag!: boolean;
  flagImgSrc: string = 'flag.png';
  sections: any;
  menuItems: any = [];

  constructor(private activatedRoute: ActivatedRoute) {
    super()
   }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((response: any) => {
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
