import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldDistribution, SubmissionReport } from 'app/core/types/submissionReport';
import { takeUntil } from 'rxjs/operators';
import { BaseReportComponent } from '../base-report/base-report.component';

@Component({
  selector: 'app-field-distributor-report',
  templateUrl: './field-distributor-report.component.html',
  styleUrls: ['./field-distributor-report.component.sass','../certification-report/certification-report.component.sass']
})
export class FieldDistributorReportComponent extends BaseReportComponent implements OnInit {
  initialReports!: SubmissionReport;
  fieldDistributionReports: FieldDistribution[] = [];
  sections: any;
  menuItems: any = [];
  expandedTables: any[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    super()
   }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((response: any) => {
      this.initialReports = response.reportData;
      this.fieldDistributionReports = response.reportData.fieldDistribution;
      this.getMenuItems();
      this.initializeExpandedTables();
      console.log(this.expandedTables)
    });
  }

  private initializeExpandedTables() {
    this.expandedTables = this.fieldDistributionReports.map((report: any, index: number) => {
      return report.fields.map((field: any) => false)
    })
  }

  showMore(reportIndex: number, fieldIndex: number) {
    if (!this.expandedTables[reportIndex][fieldIndex]) {
      this.expandedTables[reportIndex][fieldIndex] = true;
    }
  }

  showLess(reportIndex: number, fieldIndex: number) {
    if (this.expandedTables[reportIndex][fieldIndex]) {
      this.expandedTables[reportIndex][fieldIndex] = false;
    }
  }

  private getMenuItems() {
    this.fieldDistributionReports.forEach(function (element: { [x: string]: any; }) {
      for (var key in element) {
        if (element[key] && element[key].length === 0) {
          delete element[key]
        }
      }
    });

    this.menuItems = this.fieldDistributionReports.map((report: any, index: number) => {
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

}
