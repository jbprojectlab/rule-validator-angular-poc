import { Component, OnInit } from '@angular/core';
import reportData from './report-data.json'
import productData from './product-data.json'

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  initialProducts: any = JSON.parse(JSON.stringify(productData)) 
  products: any = this.initialProducts
  menuItems: any = []
  menuIsOpen: boolean = false
  flagMenuIsOpen: boolean = false

  // @ts-ignore
  expandedTableIndexes: any[] = this.initialProducts.map((product, i) => product.tables[0][1].map((row, j) => false))

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

  toggleFlagMenu() {
    this.flagMenuIsOpen = !this.flagMenuIsOpen
  }

  filterTableByFlags(arr: any[]) {
    return arr.filter(x => x[0].includes('flag'))
  }

  filterTablesByFlag(flagType: string) {
    // console.log('flagType:  ', flagType)
    console.log('productData:   ', productData)
    
    this.products = JSON.parse(JSON.stringify(productData))
    // console.log('products:  ', this.products)

    const filtered = [this.products[0]]

    // let products = this.products.map((product: any) => product)

    for(let i = 1; i < this.products.length; i += 1) {
      let product = this.products[i]
      const tables = product.tables.map((table: any) => table)
      for(let j = 0; j < tables.length; j += 1) {
        let table = tables[j][1].filter((row: any) => row[0] === flagType)
        tables[j][1] = table
      }
      filtered.push(product)
    }
    this.products = [...filtered]
    this.expandedTableIndexes = this.expandedTableIndexes.map(x => x.map((y: boolean) => false))

    console.log('filtered:  ', filtered)
    // console.log('this.products after filter:   ', this.products)
  }

  productHasTables(product: any) {
    const tables = product.tables.map((table: any) => table)
    for(let i = 0; i < tables.length; i += 1) {
      const table = tables[i]
      for(let j = 1; j < table.length; j += 1) {
        if(table[j].length) return true
      }
    }
    return false
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
  }
}
