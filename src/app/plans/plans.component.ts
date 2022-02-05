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
    'Category',
    'Date Submission Received',
    'Mode',
    'Submission Status',
    'Submission Current State',
    'Last Updated',
    'Plan Validation Due',
    'L2 Report Score'
  ]

  plans = [
    {
      group: 'GRP1234',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23456,
      dateReceived: 1643582886199,
      category: 'Category 1',
      mode: 'Mode 1',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1643582086199,
      dueDate: 1643583206196,
      reportScore: 1.2
    },
    {
      group: 'GRP1234',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23457,
      dateReceived: 1643582896199,
      category: 'Category 1',
      mode: 'Mode 1',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1643582186199,
      dueDate: 1643583216196,
      reportScore: 0
    },
    {
      group: 'GRP5678',
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23458,
      dateReceived: 1643582916199,
      category: 'Category 1',
      mode: 'Mode 1',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1643582286199,
      dueDate: 1643583226196,
      reportScore: 0.5
    },
    {
      group: 'GRP5678',
      planName: 'Plan 3',
      throughPeriod: 202112,
      controlNumber: 23459,
      dateReceived: 1643582926199,
      category: 'Category 2',
      mode: 'Mode 2',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1643582386199,
      dueDate: 1643583236196,
      reportScore: 0.75
    },
      {
      group: 'GRP4321',
      planName: 'Plan 4',
      throughPeriod: 202112,
      controlNumber: 23460,
      dateReceived: 1643582936199,
      category: 'Category 2',
      mode: 'Mode 2',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1643582486199,
      dueDate: 1643583246196,
      reportScore: 1.4
    },
    {
      group: 'GRP4321',
      planName: 'Plan 5',
      throughPeriod: 202112,
      controlNumber: 23461,
      dateReceived: 1643582946199,
      category: 'Category 2',
      mode: 'Mode 2',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1643582586199,
      dueDate: 1643583256196,
      reportScore: 0.1
    },
    {
      group: 'GRP4321',
      planName: 'Plan 6',
      throughPeriod: 202112,
      controlNumber: 23462,
      dateReceived: 1643582956199,
      category: 'Category 4',
      mode: 'Mode 4',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1643582686199,
      dueDate: 1643583266196,
      reportScore: 0.2
    },
    {
      group: 'GRP4321',
      planName: 'Plan 7',
      throughPeriod: 202112,
      controlNumber: 23456,
      dateReceived: 1643582966199,
      category: 'Category 4',
      mode: 'Mode 4',
      status: 'L1 Pass',
      currentState: 'Open',
      lastUpdated: 1643582786199,
      dueDate: 1643583276196,
      reportScore: 0.75
    },
    {
      group: 'GRP9876',
      planName: 'Plan 8',
      throughPeriod: 202112,
      controlNumber: 23463,
      dateReceived: 1643582976199,
      category: 'Category 4',
      mode: 'Mode 4',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1643582886199,
      dueDate: 1643583286196,
      reportScore: 1
    },
    {
      group: 'GRP9876',
      planName: 'Plan 9',
      throughPeriod: 202112,
      controlNumber: 23464,
      dateReceived: 1643582986199,
      category: 'Category 4',
      mode: 'Mode 4',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1643582986199,
      dueDate: 1643583296196,
      reportScore: 0
    },
  ]  

  constructor() {
  }

  ngOnInit(): void {
    console.log('plans:  ', this.plans)
  }
}
