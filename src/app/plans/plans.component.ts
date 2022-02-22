import { Component, OnInit } from '@angular/core';
import { Plan } from '../../d'
import { initialPlans } from './plans'

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

  plans: Plan[] = initialPlans.map((plan: Plan) => plan)
  searchFilter: Plan = {}

  handleSearchFilterChange(key: string, value: string | number, type: string) {
    if(!value) {
      // @ts-ignore
      delete this.searchFilter[key]
    } else {
      // @ts-ignore
      this.searchFilter[key] = value
    }
  }

  search() {
    let filtered: Plan[] = []
    this.plans = initialPlans

    for(let i = 0; i < this.plans.length; i += 1) {
      const plan = this.plans[i]
      const filteredPlan: Plan = {
        planName: plan.planName,
        dateReceived: plan.dateReceived,
        status: plan.status,
        currentState: plan.currentState,
        lastUpdated: plan.lastUpdated,
        dueDate: plan.dueDate,
        reportScore: plan.reportScore
      }
      
      let submissionGroup = plan.submissionGroup,
      paidThroughPeriod = plan.paidThroughPeriod,
      controlNumber = plan.controlNumber,
      category = plan.category,
      mode = plan.mode

      if(!this.searchFilter.submissionGroup || this.searchFilter.submissionGroup === submissionGroup) {
        filteredPlan.submissionGroup = submissionGroup
      } else continue

      if(!this.searchFilter.paidThroughPeriod || this.searchFilter.paidThroughPeriod === paidThroughPeriod) {
        filteredPlan.paidThroughPeriod = paidThroughPeriod
      } else continue

      if(!this.searchFilter.controlNumber || this.searchFilter.controlNumber === controlNumber) {
        filteredPlan.controlNumber = controlNumber
      } else continue

      if(!this.searchFilter.category || this.searchFilter.category === category) {
        filteredPlan.category = category
      } else continue

      if(!this.searchFilter.mode || this.searchFilter.mode === mode) {
        filteredPlan.mode = mode
      } else continue

      filtered.push(filteredPlan)
    }

    this.plans = filtered
  }

  constructor() {}

  ngOnInit(): void {
    this.plans = initialPlans
  }

  selectRow(row: number) {
    this.selectedRow = row
  }
}

// 0 = green
// > 0 < 1 = yellow
// >= 1 = red

// max = 1.5

// create user model