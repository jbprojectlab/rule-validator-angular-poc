import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.sass']
})

export class PlansComponent implements OnInit {
  headers = [
    'Submission Group / Plan Code',
    'Plan Name',
    'Paid Through Period',
    'Submission Control #',
    'Date Submission Received',
    'Category',
    'Mode',
    'Submission Status',
    'Submission Current State',
    'Last Updated',
    'Plan Validation Due',
    'L2 Report Score'
  ]

  plans = [
    {
      group: '100101234',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23456,
      dateReceived: 1623582886199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582086199,
      dueDate: 1643583206196,
      reportScore: 1.2
    },
    {
      group: '100101234',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23457,
      dateReceived: 1623582896199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582186199,
      dueDate: 1643583216196,
      reportScore: 0
    },
    {
      group: '100105678',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23458,
      dateReceived: 1623582916199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582286199,
      dueDate: 1643583226196,
      reportScore: 0.5
    },
    {
      group: '100105678',
      planName: 'Plan 3',
      throughPeriod: 202112,
      controlNumber: 23459,
      dateReceived: 1623582926199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582386199,
      dueDate: 1643583236196,
      reportScore: 0.75
    },
      {
      group: '100104321',
      planName: 'Plan 4',
      throughPeriod: 202112,
      controlNumber: 23460,
      dateReceived: 1623582936199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582486199,
      dueDate: 1643583246196,
      reportScore: 1.4
    },
    {
      group: '100104321',
      planName: 'Plan 5',
      throughPeriod: 202112,
      controlNumber: 23461,
      dateReceived: 1623582946199,
      category: 'abcd',
      mode: 'Active',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582586199,
      dueDate: 1643583256196,
      reportScore: 0.1
    },
    {
      group: '100104321',
      planName: 'Plan 6',
      throughPeriod: 202112,
      controlNumber: 23462,
      dateReceived: 1623582956199,
      category: 'abcd',
      mode: 'Active',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582686199,
      dueDate: 1643583266196,
      reportScore: 0.2
    },
    {
      group: '100104321',
      planName: 'Plan 7',
      throughPeriod: 202112,
      controlNumber: 23456,
      dateReceived: 1623582966199,
      category: 'abcd',
      mode: 'Active',
      status: 'L1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582786199,
      dueDate: 1643583276196,
      reportScore: 0.75
    },
    {
      group: '100109876',
      planName: 'Plan 8',
      throughPeriod: 202112,
      controlNumber: 23463,
      dateReceived: 1623582976199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1633582886199,
      dueDate: 1643583286196,
      reportScore: 1
    },
    {
      group: '100109876',
      planName: 'Plan 9',
      throughPeriod: 202112,
      controlNumber: 23464,
      dateReceived: 1623582986199,
      category: 'abcd',
      mode: 'Active',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1633582986199,
      dueDate: 1643583296196,
      reportScore: 0
    },
  ]

  selectedRow = 0

  constructor() {}

  ngOnInit(): void {
    console.log('plans:  ', this.plans)
  }

  selectRow(row: number) {
    this.selectedRow = row
  }
}
