import { Component, OnInit } from '@angular/core';
import reportData from './report-data.json'

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  products: any = reportData
  menuItems: any = reportData.map(section => Object.keys(section.data))

  constructor() { }

  ngOnInit(): void {
  }

}
