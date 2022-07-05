import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.sass']
})
export class PlanTableComponent {
// showTableIcon: string = !isOpen ? 'show-more-blue' : 'show-less-blue'
  @Input() title!: string;
  @Input() tableData: any;
  @Input() toggleTable: any;
  @Input() rejectsTableIsOpen: any;
  @Input() transformationsTableIsOpen: any;
  @Input() analyticalWarningsTableIsOpen: any;
  headers: string[] = [
    'Description',
    'Record Count',
    'Percentage Variance',
    '<PTD Period>',
    '<PTD-1 Period>',
    '<PTD-2 Period>',
    '<PTD Period>',
    '<PTD-1 Period>',
    '<PTD-2 Period>',
    '<PTD Period>',
    '<PTD-1 Period>',
    '<PTD-2 Period>',
    '<PTD Period>',
    '<PTD-1 Period>',
    '<PTD-2 Period>'
  ];
  
  constructor() { }
  
  formatDecimalToPercent(decimal: number) {
    let number = String(decimal * 100)
    return parseFloat(number).toFixed(2) + '%';
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }
}
