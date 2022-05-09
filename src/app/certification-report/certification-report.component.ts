import { Component, OnInit } from '@angular/core';
import reportData from './report-data.json'

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  products: any = reportData
  menuItems: any = []
  
  getMenuItems() {
    // [{title:  'Product 1', items: ['foo', 'bar']}]
    const menuItems: any = []
    for(let i = 0; i < this.products.length; i += 1) {
      let product = this.products[i]
      let section: any = {}
      section.title = product.name
      section.items = Object.keys(product.data)
      menuItems.push(section)
    }
    return menuItems
  }

  constructor() { }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems()
  }

}
