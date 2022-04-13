import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../d'
// import dummyPlans from './plans.json'

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
    let currentMonth = String(currentDate.getMonth() + 1)
    if(currentMonth.length < 2) currentMonth = '0' + currentMonth
    return currentYear + currentMonth
  }

  formatNextPaidDateOption(currentDate: string) {
    let nextDateYear = currentDate.slice(0, 4)
    let nextDateMonth = String(Number(currentDate.slice(4)) - 1)
    if(nextDateMonth === '-1') {
      nextDateYear = String(Number(nextDateYear) - 1)
      nextDateMonth = '12'
    }
    if(nextDateMonth.length < 2) {
      nextDateMonth = '0' + nextDateMonth
    }
    const nextDate = nextDateYear + nextDateMonth
    return nextDate
  }

  getPaidThroughPeriodOptions() {
    let currentDate = this.getCurrentPaidDate()
    const dateOptions: string[] = [currentDate]
    for(let i = 0; i < 133; i += 1) {
      let nextDate = this.formatNextPaidDateOption(currentDate)
      currentDate = nextDate
      dateOptions.push(currentDate)
    }
    return dateOptions
  }

  selectedSubmissionGroupOption!: string;
  selectedPaidThroughPeriodOption: string = this.getCurrentPaidDate();
  selectedModeOption!: string;
  selectedControlNumberOption!: string;
  selectedCategoryOption!: string;

  getUniqueOptions(plans: Plan[], key: string) {
    // @ts-ignore
    const uniqueOptions = [...new Set(plans.map((plan: Plan) => plan[key]))]
    return uniqueOptions
  }

  submissionGroupOptions!: string[] | any[]
  paidThroughPeriodOptions!: string[] | any[] 
  modeOptions!: string[] | any[]
  submissionControlOptions!: number[] | any[]
  categoryOptions!: string[] | any[]

  options: any = {
    submissionGroupOptions: this.submissionGroupOptions,
    paidThroughPeriodOptions: this.paidThroughPeriodOptions,
    modeOptions: this.modeOptions,
    submissionControlOptions: this.submissionControlOptions,
    categoryOptions: this.categoryOptions
  }

  handleSearchFilterChange(key: string, value: string | number, type: string) {
    if(key === 'paidThroughPeriod') {
      this.getPlans()
    }
    
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

    this.getPlans().subscribe((response) => {
      this.plans = response
      
      this.options.submissionGroupOptions = this.getUniqueOptions(this.initialPlans, 'submissionGroup')
      this.options.modeOptions = this.getUniqueOptions(this.initialPlans, 'mode')
      this.options.submissionControlOptions = this.getUniqueOptions(this.initialPlans, 'submissionControl')
      this.options.categoryOptions = this.getUniqueOptions(this.initialPlans, 'category')
      
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
  
      this.selectedPaidThroughPeriodOption = this.selectedPaidThroughPeriodOption || this.getCurrentPaidDate()
      this.plans = filtered
    })
  }

  constructor(private http: HttpClient) {}

  getPlans(): Observable<any> {
    const currentPaidDate = this.selectedPaidThroughPeriodOption || this.getCurrentPaidDate()
    const url = `http://mdcdappl2r05lv.bcbsa.com:8085/api/summary/list?paiddate=${currentPaidDate}`
    return this.http.get(url)
  }

  ngOnInit(): void {
    if(this.isSearching) this.isSearching = false

    this.getPlans().subscribe((response) => {
      if(!this.initialPlans.length) this.initialPlans = response
      this.plans = response
    })

    this.options.paidThroughPeriodOptions = this.getPaidThroughPeriodOptions()
  }
}
