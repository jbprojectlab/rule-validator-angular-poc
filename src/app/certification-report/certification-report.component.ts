import { Component, OnInit } from '@angular/core';
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
  tablesFilteredByFlag: boolean = false
  flagImgSrc: string = 'flag.png'

  // @ts-ignore
  expandedTableIndexes: any[] = this.initialProducts.map((product, i) => product.tables[0][1].map((row, j) => true))

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

  resetFilter() {
    this.products = JSON.parse(JSON.stringify(productData))
    this.tablesFilteredByFlag = false
  }

  filterTablesByProduct(title: string) {
    const products = JSON.parse(JSON.stringify(productData))
    const filtered = []

    for(let i = 0; i < products.length; i += 1) {
      let product = products[i]
      if(product.title === title) {
        filtered.push(product)
      }
    }
    this.products = [...filtered]
    this.expandedTableIndexes = this.expandedTableIndexes.map(x => x.map((y: boolean) => false))
  }

  filterTablesByTable(title: string, tableIdx: number) {
    const products = JSON.parse(JSON.stringify(productData))
    let filteredTable = []
    const filteredProduct: any = {
      title,
      tables: []
    }

    for(let i = 0; i < products.length; i += 1) {
      let product = products[i]
      if(product.title === title) {
        filteredTable = product.tables[tableIdx]
        filteredProduct.tables.push(filteredTable)
      }
    }
    this.products = [filteredProduct]
    this.expandedTableIndexes = this.expandedTableIndexes.map(x => x.map((y: boolean) => false))
  }

  filterTableByFlags(arr: any[]) {
    return arr.filter(x => x[0].includes('flag'))
  }

  filterTablesByFlag() {
    this.products = JSON.parse(JSON.stringify(productData))
    const filtered = []

    for(let i = 0; i < this.products.length; i += 1) {
      let product = this.products[i]
      const tables = product.tables.map((table: any) => table)
      for(let j = 0; j < tables.length; j += 1) {
        let table = tables[j][1].filter((row: any) => row[0] === 'warning_flag')
        tables[j][1] = table
      }
      filtered.push(product)
    }
    this.products = [...filtered]
    this.expandedTableIndexes = this.expandedTableIndexes.map(x => x.map((y: boolean) => false))
    this.tablesFilteredByFlag = true
  }

  toggleFlagFilter() {
    if(this.tablesFilteredByFlag) {
      this.flagImgSrc = 'flag.png'
      this.resetFilter()
    } else {
      this.flagImgSrc = 'flag-yellow.png'
      this.filterTablesByFlag()
    }
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
    const initProducts = JSON.parse(JSON.stringify(productData))
    const table = initProducts[i].tables[j][1]
    this.products[i].tables[j][1] = table
    this.expandedTableIndexes[i][j] = true
  }
  
  showLess(i: number, j: number) {
    this.expandedTableIndexes[i][j] = false
  }

  getMenuItems() {
    const menuItems: any = []
    for(let i = 0; i < this.products.length; i += 1) {
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
    console.log('PRODUCTS:   ', this.products)
  }
}
