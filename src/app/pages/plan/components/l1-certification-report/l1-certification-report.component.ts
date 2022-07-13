import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, fieldData, L1Reports, SubmissionReport } from 'app/core/types/submissionReport';
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
  flagMenuIsOpen: boolean = false;

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
      this.filterTablesByFlag();
    });
  }

  filterTablesByFlag(flagType?: number) {
    if (flagType && flagType !== 3) {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: fieldData) => {
          field.filterDataTable = field.dataTable?.filter((item: any) => (item.flag === flagType))
        });
      });
      console.log('reports:  ', this.l1Reports)
    } else {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: fieldData) => {
          field.filterDataTable = field.dataTable;
        });
      });
    }

    this.toggleFlagFilter(flagType)
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

  toggleFlagMenu() {
    this.flagMenuIsOpen = !this.flagMenuIsOpen
  }

  // filterTablesByFlag(flagType: number) {
  //   this.products = JSON.parse(JSON.stringify(productData))
  //   const filtered = []

  //   for(let i = 0; i < this.products.length; i += 1) {
  //     let product = this.products[i]
  //     const tables = product.tables.map((table: any) => table)
  //     for(let j = 0; j < tables.length; j += 1) {
  //       let table = tables[j][1].filter((row: any) => row[0] === flagType)
  //       tables[j][1] = table
  //     }
  //     filtered.push(product)
  //   }
  //   this.products = [...filtered]
  //   this.expandedTableIndexes = this.expandedTableIndexes.map(x => x.map((y: boolean) => false))
  // }

  toggleFlagFilter(flagType?: number) {
    // this.tablesFilteredByFlag = !this.tablesFilteredByFlag;
    // if (!this.tablesFilteredByFlag) {
    //   this.flagImgSrc = 'flag.png';
    // } else {
    //   this.flagImgSrc = 'flag-yellow.png';
    // }
    // this.filterTablesByFlag();

    if (flagType === 1) {
      this.flagImgSrc = 'flag-yellow.png';
    } else if (flagType === 2) {
      this.flagImgSrc = 'flag-red.png';
    } else {
      this.flagImgSrc = 'flag.png';
    }
    // this.filterTablesByFlag();
  }

  showLess(field: fieldData) {
    field.filterDataTable = field.dataTable?.filter((item:DataTable) => (item.flag > 0));
    field.showMore = true;
  }
  
  showMore(field: fieldData) {
    field.filterDataTable = field.dataTable;
    field.showMore = false;
  }
}
