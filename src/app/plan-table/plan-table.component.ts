import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.sass']
})
export class PlanTableComponent implements OnInit {
  // showTableIcon: string = !isOpen ? 'show-more-blue' : 'show-less-blue'

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
  ]
  
  formatDecimalToPercent(decimal: number) {
    let number = String(decimal * 100)
    return parseFloat(number).toFixed(2) + '%'
  }

  @Input() title!: string;
  @Input() tableData: any;
  @Input() toggleTable: any;
  @Input() rejectsTableIsOpen: any;
  @Input() transformationsTableIsOpen: any;
  @Input() analyticalWarningsTableIsOpen: any;

  constructor() { }

  ngOnChanges(changes: SimpleChange) {
    console.log('changes:  ', changes)
    // console.log('table is open:   ', this.tableIsOpen)
  }

  ngOnInit(): void {
    // console.log('table data:   ', this.tableData)
    // console.log('title:  ', this.title)
  }

}
