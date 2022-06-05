import { Component, OnInit } from '@angular/core';
import productData from './product-data.json';

@Component({
  selector: 'app-certification-report',
  templateUrl: './certification-report.component.html',
  styleUrls: ['./certification-report.component.sass']
})
export class CertificationReportComponent implements OnInit {
  initialProducts: any = JSON.parse(JSON.stringify(productData));
  products: any = this.initialProducts;
  menuItems: any = [];
  menuIsOpen: boolean = false;
  tablesFilteredByFlag: boolean = false;
  flagImgSrc: string = 'flag.png';
  panelTop: boolean = false;

  // @ts-ignore
  expandedTableIndexes: any[] = this.initialProducts.map((product, i) => product.tables[0][1].map((row, j) => true));

  openMenu() {
    if(!this.menuIsOpen) {
      this.menuIsOpen = true;
    }
  }

  closeMenu() {
    if(this.menuIsOpen) {
      this.menuIsOpen = false;
    }
  }

  resetFilter() {
    this.products = JSON.parse(JSON.stringify(productData));
    this.tablesFilteredByFlag = false;
    this.expandedTableIndexes = this.expandedTableIndexes.map(product => product.map((table: boolean) => true));
  }

  filterTablesByProduct(title: string) {
    const products = JSON.parse(JSON.stringify(productData));
    const filtered = [];

    for(const product of this.products) {
      if(product.title === title) {
        filtered.push(product);
      }
    }
    this.products = [...filtered];
    this.expandedTableIndexes = this.expandedTableIndexes.map(product => product.map((table: boolean) => false));
  }

  filterTablesByTable(title: string, tableIdx: number) {
    const products = JSON.parse(JSON.stringify(productData))
    let filteredTable = [];
    const filteredProduct: any = {
      title,
      tables: []
    }

    for(const product of this.products) {
      if(product.title === title) {
        filteredTable = product.tables[tableIdx];
        filteredProduct.tables.push(filteredTable);
      }
    }
    this.products = [filteredProduct];
    this.expandedTableIndexes = this.expandedTableIndexes.map(product => product.map((table: boolean) => false));
  }

  filterTableByFlags(table: any[]) {
    return table.filter(row => row[0].includes('flag'));
  }

  filterTablesByFlag() {
    this.products = JSON.parse(JSON.stringify(productData));
    const filtered = [];

    for(const product of this.products) {
      const tables = product.tables.map((table: any) => table);
      for(let j = 0; j < tables.length; j += 1) {
        let table = tables[j][1].filter((row: any) => row[0] === 'warning_flag');
        tables[j][1] = table;
      }
      filtered.push(product);
    }
    this.products = [...filtered];
    this.expandedTableIndexes = this.expandedTableIndexes.map(product => product.map((table: boolean) => false));
    this.tablesFilteredByFlag = true;
  }

  toggleFlagFilter() {
    if(this.tablesFilteredByFlag) {
      this.flagImgSrc = 'flag.png';
      this.resetFilter();
    } else {
      this.flagImgSrc = 'flag-yellow.png';
      this.filterTablesByFlag();
    }
  }

  productHasTables(product: any) {
    const tables = product.tables.map((table: any) => table);
    for(let i = 0; i < tables.length; i += 1) {
      const table = tables[i];
      for(let j = 1; j < table.length; j += 1) {
        if(table[j].length) return true;
      }
    }
    return false;
  }

  showMore(i: number, j: number) {
    const initProducts = JSON.parse(JSON.stringify(productData));
    const table = initProducts[i].tables[j][1];
    this.products[i].tables[j][1] = table;
    this.expandedTableIndexes[i][j] = true;
  }
  
  showLess(i: number, j: number) {
    this.expandedTableIndexes[i][j] = false;
  }

  getMenuItems() {
    const menuItems: any = []
    for(const product of this.products) {
      let section: any = {
        title: '',
        items: []
      };
      section.title = product.title;
      for(let j = 0; j < product.tables.length; j += 1) {
        section.items.push('Table ' + (j + 1));
      }
      menuItems.push(section);
    }
    return menuItems;
  }

  scrollToTable(productIdx: number, tableIdx: number, lastTable: boolean) {
    const table = document.getElementById(`item-${productIdx}-${tableIdx}`);
    if(table) {
      table.scrollIntoView(true);
      if(!lastTable) {
        document.body.scrollTop = document.body.scrollTop - 420;
      }
      this.closeMenu();
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
  }
}
