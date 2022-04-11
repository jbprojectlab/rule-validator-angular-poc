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
  plans: Plan[] = []
  initialPlans: Plan[] = []
  searchFilter: Plan = {}
  isSearching: boolean = false
  
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

  getCurrentPaidDate() {
    const currentDate = new Date()
    const currentYear = String(currentDate.getFullYear())
    let currentMonth = String(currentDate.getMonth())
    if(currentMonth.length < 2) currentMonth = '0' + currentMonth
    return currentYear + currentMonth
  }

  selectedSubmissionGroupOption!: number;
  selectedPaidThroughPeriodOption: string = this.getCurrentPaidDate();
  selectedModeOption!: string;
  selectedControlNumberOption!: string;
  selectedCategoryOption!: string;

  getUniqueOptions(plans: Plan[], key: string) {
    // @ts-ignore
    return [...new Set(plans.map((plan: Plan) => plan[key]))]
  }

  submissionGroupOptions: string[] | any[] = this.getUniqueOptions(this.initialPlans, 'submissionGroup')
  paidThroughPeriodOptions: number[] | any[] = this.getUniqueOptions(this.initialPlans, 'paidThroughPeriod')
  modeOptions: string[] | any[] = this.getUniqueOptions(this.initialPlans, 'mode')
  submissionControlOptions: string[] | any[] = this.getUniqueOptions(this.initialPlans, 'submissionControl')
  categoryOptions: string[] | any[] = this.getUniqueOptions(this.initialPlans, 'category')

  options: any = {
    submissionGroupOptions: this.submissionGroupOptions,
    paidThroughPeriodOptions: this.paidThroughPeriodOptions,
    modeOptions: this.modeOptions,
    submissionControlOptions: this.submissionControlOptions,
    categoryOptions: this.categoryOptions
  }

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
    const currentPaidDate = this.selectedPaidThroughPeriodOption
    const url = `http://mdcdapp12r051v.bcbsbsa:8085/api/summary/list?paiddate=${currentPaidDate}`
    console.log('url:  ', url)
    return this.http.get(url)
  }

  ngOnInit(): void {
    if(this.isSearching) this.isSearching = false

    this.getPlans().subscribe((response) => {
      this.initialPlans = response
      this.plans = this.initialPlans
    })
  }
}
