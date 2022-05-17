import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../d'
import dummyPlans from './plans.json'

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
    const currentPaidDate = currentYear + currentMonth
    return currentPaidDate
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

  selectedSubmissionGroupOption!: number;
  selectedPaidThroughPeriodOption: string = this.getCurrentPaidDate();
  selectedSubmissionCurrentStateOption!: string;
  selectedCategoryOption!: string;
  selectedStatusOption!: string;

  submissionGroupOptions!: number[] | any[]
  paidThroughPeriodOptions!: string[] | any[] 
  submissionCurrentStateOptions!: string[] | any[]
  categoryOptions!: string[] | any[]
  statusOptions!: string[] | any[]

  options: any = {
    submissionGroupOptions: this.submissionGroupOptions,
    paidThroughPeriodOptions: this.paidThroughPeriodOptions,
    submissionCurrentStateOptions: this.submissionCurrentStateOptions,
    categoryOptions: this.categoryOptions,
    statusOptions: this.statusOptions
  }

  handleSearchFilterChange(key: string, value: string | number) {
    if(key === 'paidThroughPeriod' || key === 'submissionGroup') {
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

  filterPlans() {
    let filtered: Plan[] = []

    for(let i = 0; i < this.initialPlans.length; i += 1) {
      const plan = this.initialPlans[i]
      const filteredPlan: Plan = {
        planName: plan.planName,
        submissionControl: plan.submissionControl,
        submissionReceivedDate: plan.submissionReceivedDate,
        mode: plan.mode,
        lastUpdated: plan.lastUpdated,
        planValidationDue: plan.planValidationDue,
        reportScoreL2: plan.reportScoreL2
      }

      let submissionGroup = plan.submissionGroup,
      paidThroughPeriod = plan.paidThroughPeriod,
      submissionCurrentState = plan.submissionCurrentState,
      category = plan.category,
      status = plan.status

      let submissionGroupSearchFilter: number = Number(this.searchFilter.submissionGroup)
      let submissionGroupNumber: number = Number(submissionGroup)
      
      if(!this.searchFilter.submissionGroup || submissionGroupSearchFilter === submissionGroupNumber) {
        filteredPlan.submissionGroup = submissionGroup
      } else continue

      if(!this.searchFilter.paidThroughPeriod || this.searchFilter.paidThroughPeriod === paidThroughPeriod) {
        filteredPlan.paidThroughPeriod = paidThroughPeriod
      } else continue

      if(!this.searchFilter.submissionCurrentState || this.searchFilter.submissionCurrentState === submissionCurrentState) {
        filteredPlan.submissionCurrentState = submissionCurrentState
      } else continue

      if(!this.searchFilter.category || this.searchFilter.category === category) {
        filteredPlan.category = category
      } else continue

      if(!this.searchFilter.status || this.searchFilter.status === status) {
        filteredPlan.status = status
      } else continue

      filtered.push(filteredPlan)
    }

    // this.selectedPaidThroughPeriodOption = this.selectedPaidThroughPeriodOption || this.getCurrentPaidDate()
    this.plans = filtered
  }

  paidThroughPeriod: string = this.getCurrentPaidDate()
  submissionGroup: number = 0

  search() {
    this.isSearching = true

    if(this.paidThroughPeriod !== this.selectedPaidThroughPeriodOption || this.submissionGroup != this.selectedSubmissionGroupOption) {
      this.getPlans().subscribe((response: Plan[]) => {
        this.initialPlans = response
        // this.initialPlans = dummyPlans
        this.paidThroughPeriod = this.selectedPaidThroughPeriodOption
        this.submissionGroup = this.selectedSubmissionGroupOption

        console.log('response on search:  ', response)
        
        this.filterPlans()
      })
    } else {
      this.filterPlans()
    }
  }

  constructor(private http: HttpClient) {}

  getOptions(): Observable<any> {
    const url = 'http://mdcdappl2r05lv.bcbsa.com:8085/api/summary/filters'
    return this.http.get(url)
    // return this.http.get('http://date.jsontest.com')
  }

  getUrl() {
    let url = 'http://mdcdappl2r05lv.bcbsa.com:8085/api/summary/list'
    if(this.selectedPaidThroughPeriodOption && this.selectedSubmissionGroupOption) {
      url += `?paiddate=${this.selectedPaidThroughPeriodOption}&submissionGroup=${this.selectedSubmissionGroupOption}`
    } else if(this.selectedPaidThroughPeriodOption) {
      url += `?paiddate=${this.selectedPaidThroughPeriodOption}`
    } else if(this.selectedSubmissionGroupOption) {
      url += `?submissionGroup=${this.selectedSubmissionGroupOption}`
    }
    return url
  }

  getPlans(): Observable<any> {
    const url = this.getUrl()
    console.log('url:   ', url)
    return this.http.get(url)
    // return this.http.get('http://date.jsontest.com')
  }

  ngOnInit(): void {
    if(this.isSearching) this.isSearching = false

    this.getOptions().subscribe((response: any) => {
      console.log('options response: ', response)
      this.options = {
        submissionGroupOptions: response.submissionGroup,
        submissionCurrentStateOptions: response.submissionCurrentState,
        categoryOptions: response.category,
        statusOptions: response.submissionStatus,
        paidThroughPeriodOptions: this.getPaidThroughPeriodOptions()
      }
    })

    this.getPlans().subscribe((response: Plan[]) => {
      if(!this.initialPlans.length) this.initialPlans = response
      this.plans = response
      // this.plans = dummyPlans
    })
  }
}
