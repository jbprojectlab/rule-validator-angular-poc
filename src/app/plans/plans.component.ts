import { Component, OnInit } from '@angular/core';

// planName: 'Plan 9',
// throughPeriod: 202106,
// controlNumber: 23459,
// dateReceived: 1623582986199,
// category: 'abcd',
// mode: 'N/A',
// status: 'Ready for L1 Review',
// currentState: 'Open',
// lastUpdated: 1633582986199,
// dueDate: 1643583296196,
// reportScore: 0

interface Plan {
  submissionGroup?: number;
  planName?: string;
  throughPeriod?: number;
  controlNumber?: number;
  dateReceived?: number;
  category?: string;
  mode?: string;
  status?: string;
  currentState?: string;
  lastUpdated?: number;
  dueDate?: number;
  reportScore?: number;
}

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

  initialPlans = [
    {
      submissionGroup: 100101234,
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
      submissionGroup: 100101234,
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23456,
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
      submissionGroup: 100101234,
      planName: 'BCBSIL',
      throughPeriod: 202112,
      controlNumber: 23456,
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
      submissionGroup: 100105678,
      planName: 'Plan 3',
      throughPeriod: 202110,
      controlNumber: 23457,
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
      submissionGroup: 100105678,
      planName: 'Plan 4',
      throughPeriod: 202110,
      controlNumber: 23457,
      dateReceived: 1623582936199,
      category: 'abcd',
      mode: 'inActive',
      status: 'Ready for L2 Review',
      currentState: 'Open',
      lastUpdated: 1633582486199,
      dueDate: 1643583246196,
      reportScore: 1.4
    },
    {
      submissionGroup: 100104321,
      planName: 'Plan 5',
      throughPeriod: 202110,
      controlNumber: 23457,
      dateReceived: 1623582946199,
      category: 'abcd',
      mode: 'inActive',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582586199,
      dueDate: 1643583256196,
      reportScore: 0.1
    },
    {
      submissionGroup: 100104321,
      planName: 'Plan 6',
      throughPeriod: 202108,
      controlNumber: 23458,
      dateReceived: 1623582956199,
      category: 'abcd',
      mode: 'inActive',
      status: 'Level 1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582686199,
      dueDate: 1643583266196,
      reportScore: 0.2
    },
    {
      submissionGroup: 100104321,
      planName: 'Plan 7',
      throughPeriod: 202108,
      controlNumber: 23458,
      dateReceived: 1623582966199,
      category: 'abcd',
      mode: 'Inactive',
      status: 'L1 Pass',
      currentState: 'Open',
      lastUpdated: 1633582786199,
      dueDate: 1643583276196,
      reportScore: 0.75
    },
    {
      submissionGroup: 100109876,
      planName: 'Plan 8',
      throughPeriod: 202106,
      controlNumber: 23459,
      dateReceived: 1623582976199,
      category: 'abcd',
      mode: 'N/A',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1633582886199,
      dueDate: 1643583286196,
      reportScore: 1
    },
    {
      submissionGroup: 100109876,
      planName: 'Plan 9',
      throughPeriod: 202106,
      controlNumber: 23459,
      dateReceived: 1623582986199,
      category: 'abcd',
      mode: 'N/A',
      status: 'Ready for L1 Review',
      currentState: 'Open',
      lastUpdated: 1633582986199,
      dueDate: 1643583296196,
      reportScore: 0
    },
  ]

  selectedRow = 0

  selectedSubmissionGroupOption!: number;
  selectedPaidThroughPeriodOption!: number;
  selectedModeOption!: string;
  selectedControlNumberOption!: string;
  selectedCategoryOption!: string;

  options: any = {
    submissionGroupOptions: [
      100101234,
      100105678,
      100104321,
      100109876,
    ],
    paidThroughPeriodOptions: [
      202112,
      202110,
      202108,
      202106,
    ],
    modeOptions: [
      'Active',
      'Inactive',
      'N/A',
    ],
    controlNumberOptions: [
      23456,
      23457,
      23458,
      23459,
    ],
    categoryOptions: [
      'abcd',
      'efgh',
      'ijkl',
      'mnop',
    ]
  }

  plans: Plan[] = []
  filteredPlans: Plan[] = this.initialPlans.map((plan: Plan) => plan)

  handleSearchFilterChange(key: string | number, value: any, type: string) {
    let match = type === 'number' ? Number(value) : value
    
    if(match) {
      console.log('filtered before:   ', this.filteredPlans)
      // @ts-ignore
      this.filteredPlans = this.filteredPlans.filter((plan: Plan) => plan[key] == match)
      console.log('key:  ', key, '    match:  ', match, '   filtered Plans after:    ', this.filteredPlans)
    }
  }

  search() {
    this.plans = this.filteredPlans
  }

  constructor() {}

  ngOnInit(): void {
    this.plans = this.initialPlans
    console.log('plans:  ', this.plans)

    // else if(this.plans.length !== this.initialPlans.length) {
    //   this.plans = this.initialPlans
    // }
  }

  selectRow(row: number) {
    this.selectedRow = row
  }
}
