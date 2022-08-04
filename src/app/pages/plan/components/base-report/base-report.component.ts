import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export class BaseReportComponent implements OnDestroy {
  menuIsOpen: boolean = false;
  isMenuOpen=false;
  protected  destroyed$: Subject<boolean> = new Subject();
  constructor() { }

  toggleMenu($event: { stopPropagation: () => void; }) {    
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('click')onClicK(){
    this.isMenuOpen = false;
  }
 
  closeMenu() {
    if (this.menuIsOpen) {
      this.menuIsOpen = false;
    }
  }

  camelize(str: string) {
    if(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
    } else {
      return '';
    }
  }
  scrollToTable(reportName: string, lastTable: boolean, tableName?: string) {
    const table = tableName ? document.getElementById(`item-${reportName}-${tableName}`) : document.getElementById(`item-${reportName}`);
    if (table) {
      table.scrollIntoView(true);
      this.closeMenu();
      if (!lastTable) {
        document.body.scrollTop = document.body.scrollTop - 440;
      }
    }
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
