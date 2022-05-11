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

  // @ts-ignore
  expandedTableIndexes: any[] = productData.map((product, i) => product.tables[0][1].map((row, j) => false))

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

  filterByFlags(arr: any[]) {
    return arr.filter(x => x[0].includes('flag'))
  }

  showMore(i: number, j: number) {
    this.expandedTableIndexes[i][j] = true
    console.log('showing more:   ', this.expandedTableIndexes)
  }
  
  showLess(i: number, j: number) {
    console.log(i, j)
    this.expandedTableIndexes[i][j] = false
    console.log('showing less:  ', this.expandedTableIndexes)
  }

  // logTableRows() {
  //   for(let i = 0; i < this.products.length; i += 1) {
  //     let product = this.products[i]
  //     console.log('product title:  ', product.title)

  //     for(let j = 0; j < product.tables.length; j += 1) {
  //       let table = product.tables[j]
        
  //       for(let k = 0; k < table.length; k += 1) {

  //         console.log('subtable:   ', table)
          
  //         for(let m = 0; m < table[0].length; m += 1) {
  //           console.log('header:    ', table[0][m])
  //         }

  //         console.log('row:   ', table[k])
  //       }
  //     }
  //   }
  // }
  
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
    // this.logTableRows()
    console.log(this.expandedTableIndexes)
  }
}
