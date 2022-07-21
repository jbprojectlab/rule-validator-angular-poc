import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, fieldData, L1Reports, SubmissionReport } from 'app/core/types/submissionReport';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseReportComponent } from '../base-report/base-report.component';


@Component({
  selector: 'app-l1-certification-report',
  templateUrl: './l1-certification-report.component.html',
  styleUrls: ['./l1-certification-report.component.sass', '../certification-report/certification-report.component.sass'],
})
export class L1CertificationReportComponent extends BaseReportComponent implements OnInit {
  initialReports!: SubmissionReport;
  l1Reports: L1Reports[] = [];
  tablesFilteredByFlag!: boolean;
  flagImgSrc: string = 'flag.png';
  sections: any;
  menuItems: any = [];
  flagMenuIsOpen: boolean = false;
  windowScrolled = false;
  isShow!: boolean;

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
      this.isNoShowMoreButton();
    });
  }

  filterTablesByFlag(flagType?: number) {
    if (flagType && flagType !== 3 && flagType !==4) {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: fieldData) => {
          field.filterDataTable = field.dataTable?.filter((item: any) => (item.flag === flagType))
        });
      });
    } 
    else if(flagType && flagType == 4){
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: fieldData) => {
          field.filterDataTable = field.dataTable?.filter((item: any) => (item.flag === 1 || item.flag==2))
        });
      });
    }
    else {
      this.l1Reports.forEach((element: L1Reports) => {
        element.fields?.forEach((field: fieldData) => {
          field.filterDataTable = field.dataTable;
        });
      });
    }
    this.toggleFlagFilter(flagType)
    this.flagMenuIsOpen=false;
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

  toggleFlagMenu($event: { stopPropagation: () => void; }) {
    $event.stopPropagation();
    this.flagMenuIsOpen = !this.flagMenuIsOpen
  }
  toggleFlagFilter(flagType?: number) {
    if (flagType === 1) {
      this.flagImgSrc = 'flag-yellow.png';
    } else if (flagType === 2) {
      this.flagImgSrc = 'flag-red.png';
    } else if(flagType==4){
      this.flagImgSrc="flag-red-yellow.png"
    } else {
      this.flagImgSrc = 'flag.png';
    }
    this.isShow = true;
    this.isNoShowMoreButton()
  }

  showLess(field: fieldData) {
    let filteredData = field.dataTable?.filter((item:DataTable) => (item.flag > 0)) || [];
    if(filteredData.length > 0){
      field.filterDataTable =  filteredData || []
      field.dataTable = field.dataTable || []
      field.showMore = field.filterDataTable < field.dataTable ? true : false;
    }else {
      return
    }
  }
  
  showMore(field: fieldData) {
    field.filterDataTable = field.dataTable || [];
    field.showMore = field.filterDataTable.length <= 0 ? true : false;
  }

  isNoShowMoreButton() {
   this.l1Reports.forEach((element: L1Reports) => {
    element.fields?.forEach((field: fieldData) => {
      let data = field?.dataTable?.length || 0
      let filter = field?.filterDataTable?.length || 0
      field.showMore = data > filter ? true : false;
      field.isShow = data > filter ? true : false;
    });
  });
  }

  isTableEmpty(data: any, ind: number){
    return data.fields[ind].filterDataTable.length > 0 
  }

  @HostListener('click')onClick(){
    this.flagMenuIsOpen = false;
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
