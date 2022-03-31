import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../d'

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

  selectedSubmissionGroupOption!: number;
  selectedPaidThroughPeriodOption!: number;
  selectedModeOption!: string;
  selectedControlNumberOption!: string;
  selectedCategoryOption!: string;

  options: any = {
    submissionGroupOptions: [
      '100101234',
      '100105678',
      '100104321',
      '100109876',
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
      '23456',
      '23457',
      '23458',
      '23459',
    ],
    categoryOptions: [
      'abcd',
      'efgh',
      'ijkl',
      'mnop',
    ]
  }

  plans: Plan[] = []
  initialPlans: Plan[] = []
  searchFilter: Plan = {}
  isSearching: boolean = false

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
    this.plans = this.initialPlans
    this.isSearching = true

    for(let i = 0; i < this.plans.length; i += 1) {
      const plan = this.plans[i]
      const filteredPlan: Plan = {
        planName: plan.planName,
        submissionReceivedDate: plan.submissionReceivedDate,
        status: plan.status,
        submissionCurrentState: plan.submissionCurrentState,
        lastUpdated: plan.lastUpdated,
        planValidationDue: plan.planValidationDue,
        reportScoreL2: plan.reportScoreL2
      }

      let submissionGroup = plan.submissionGroup,
      paidThroughPeriod = plan.paidThroughPeriod,
      submissionControl = plan.submissionControl,
      category = plan.category,
      mode = plan.mode
      
      if(!this.searchFilter.submissionGroup || this.searchFilter.submissionGroup === submissionGroup) {
        filteredPlan.submissionGroup = submissionGroup
      } else continue

      if(!this.searchFilter.paidThroughPeriod || this.searchFilter.paidThroughPeriod === paidThroughPeriod) {
        filteredPlan.paidThroughPeriod = paidThroughPeriod
      } else continue

      if(!this.searchFilter.submissionControl || this.searchFilter.submissionControl === submissionControl) {
        filteredPlan.submissionControl = submissionControl
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

  constructor(private http: HttpClient) {}

  getPlans(): Observable<any> {
    return this.http.get('/api/summary/list?paiddate=202201')
  }

  ngOnInit(): void {
    if(this.isSearching) this.isSearching = false

    this.getPlans().subscribe((response) => {
      this.initialPlans = response
      this.plans = this.initialPlans
    })
  }
}
