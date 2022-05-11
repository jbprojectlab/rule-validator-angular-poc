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
  flagMenuIsOpen: boolean = false

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

  openFlagMenu() {
    if(!this.flagMenuIsOpen) {
      this.flagMenuIsOpen = true
    }
  }

  closeFlagMenu() {
    if(this.flagMenuIsOpen) {
      this.flagMenuIsOpen = false
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

  getMenuItems() {
    const menuItems: any = []
    for(let i = 1; i < this.products.length; i += 1) {
      let product = this.products[i]
      let section: any = {
        title: '',
        items: []
      }
      section.title = product.title
      for(let j = 0; j < product.tables.length; j += 1) {
        section.items.push('Table ' + (j + 1))
      }
      menuItems.push(section)
    }
    return menuItems
  }

  scrollToTable(tableId: number) {
    console.log('scroll to tableId:   ', tableId)
    const table = document.getElementById('item-' + tableId);
    if(table) {
      table.scrollIntoView(true);
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems()
    console.log(this.expandedTableIndexes)
  }
}
