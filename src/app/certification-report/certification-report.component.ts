import { Component, OnInit } from '@angular/core';
import reportData from './report-data.json'
import productData from './product-data.json'

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  products: any = productData
  menuItems: any = []
  menuIsOpen: boolean = false
  // expandedTableIndexes: any[] = productData.map(({data, data2, data3}, idx) => ({
  //   idx,
  //   data,
  //   data2,
  //   data3
  // }))

  expandedTableIndexes: any[] = []

  // expandedTableIndexes: any[] = productData.map((product, idx) => product.tables.map((table, idx) => idx))

  openMenu() {
    if(!this.menuIsOpen) {
      this.menuIsOpen = true
    }
  }

  closeMenu() {
    if(this.menuIsOpen) {
      this.menuIsOpen = false
    }
  }

  showMore(idx: number) {
    this.expandedTableIndexes.push(idx)
  }
  
  showLess(idx: number) {
    this.expandedTableIndexes = this.expandedTableIndexes.filter(i => i !== idx)
    console.log('showing less:  ', this.expandedTableIndexes)
  }

  logTableRows() {
    for(let i = 0; i < this.products.length; i += 1) {
      let product = this.products[i]
      console.log('product title:  ', product.title)

      for(let j = 0; j < product.tables.length; j += 1) {
        let table = product.tables[j]
        
        for(let k = 0; k < table.length; k += 1) {

          console.log('subtable:   ', table)
          
          for(let m = 0; m < table[0].length; m += 1) {
            console.log('header:    ', table[0][m])
          }

          console.log('row:   ', table[k])
        }
      }
    }
  }
  
  getMenuItems() {
    // [{title:  'Product 1', items: ['foo', 'bar']}]
    const menuItems: any = []
    for(let i = 0; i < reportData.length; i += 1) {
      let product = reportData[i]
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
    this.logTableRows()
  }
}
