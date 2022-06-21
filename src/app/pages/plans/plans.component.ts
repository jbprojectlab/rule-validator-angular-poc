import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plan } from 'app/core/types/plan';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlansService } from './services/plans.service';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.sass']
})

export class PlansComponent implements OnInit, OnDestroy {
  plans: Plan[] = [];
  isSearching: boolean = false;
  panelTop: boolean = false;
  selectedSortingColumn: string = 'Submission Group / Plan Code';
  sortIsAscending: boolean = true;
  destroyed$: Subject<boolean> = new Subject();
  paidThroughPeriod: string = this.getCurrentPaidDate();
  submissionGroup: number = 0;
  date = new FormControl(moment());
  mostRecentPaidPeriod = new Date(Date.now());
  
  selectedSubmissionGroupOption!: number;
  selectedPaidThroughPeriodOption: string = this.getCurrentPaidDate();
  selectedSubmissionState!: string;
  selectedCategory!: string;
  selectedStatus!: string;
  
  submissionGroupOptions!: number[] | any[];
  paidThroughPeriodOptions!: string[] | any[];
  submissionCurrentStateOptions!: string[] | any[];
  categoryOptions!: string[] | any[];
  statusOptions!: string[] | any[];
  
  options: any = {
    submissionGroupOptions: this.submissionGroupOptions,
    paidThroughPeriodOptions: this.paidThroughPeriodOptions,
    submissionCurrentStateOptions: this.submissionCurrentStateOptions,
    categoryOptions: this.categoryOptions,
    statusOptions: this.statusOptions
  };
  
  submissionType: string = 'non-ANTHEM'
  
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
  ];
  constructor(
    private planService: PlansService
    ) { }
    
  ngOnInit(): void {
    if (this.isSearching) this.isSearching = false;

    this.planService.getOptions().subscribe((response: any) => {
      this.options = {
        submissionGroupOptions: response.submissionGroup,
        submissionCurrentStateOptions: response.submissionCurrentState,
        categoryOptions: response.category,
        statusOptions: response.submissionStatus,
      };
    })
    this.getPlans();
    document.body.addEventListener('scroll', (e: any) => {
      if (document.body.scrollTop > 20) {
        this.panelTop = true;
      } else {
        this.panelTop = false;
      }
    })
  }

  monthSelected(event: any, dp: any, input: any) {
    dp.close();
    input.value = event.toISOString().split('-').join('').substring(0,6);
    if(this.selectedPaidThroughPeriodOption !== input.value) {
      this.selectedPaidThroughPeriodOption = input.value;
      this.getPlans();
    }
  }

  getCurrentPaidDate() {
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear());
    let currentMonth = String(currentDate.getMonth() + 1);
    if (currentMonth.length < 2) currentMonth = '0' + currentMonth;
    const currentPaidDate = currentYear + currentMonth;
    return currentPaidDate;
  }

  handleSearchFilterChange(key: string) {
    if (key === 'submissionGroup') {
      this.getPlans();
    }
  }

  sortByColumn(columnHeader: string) {
    if (columnHeader === this.selectedSortingColumn) {
      this.sortIsAscending = !this.sortIsAscending;
    } else {
      this.selectedSortingColumn = columnHeader;
    }
    
    const columnNames = {
      "Submission Group / Plan Code": 'submissionGroup',
      "Plan Name": 'planName',
      "Paid Through Period": 'paidThroughPeriod',
      "Submission Control #": 'submissionControl',
      "Date Submission Received": 'submissionReceivedDate',
      "Category": 'category',
      "Mode": 'mode',
      "Submission Status": 'status',
      "Submission Current State": 'submissionCurrentState',
      "Last Updated": 'lastUpdated',
      "Plan Validation Due": 'planValidationDueDate',
      "L2 Report Score": 'score'
    };
    // @ts-ignore
    const columnName = columnNames[columnHeader];
    // @ts-ignore
    const columnType = typeof this.plans[0][columnName];
    if (this.sortIsAscending) {
      this.plans = [...this.plans.sort((a: any, b: any) => columnType === 'number' ? a[columnName] - b[columnName] : ('' + a[columnName]).localeCompare(b[columnName]))];
    } else {
      this.plans = [...this.plans.sort((a: any, b: any) => columnType === 'number' ? b[columnName] - a[columnName] : ('' + b[columnName]).localeCompare(a[columnName]))];     
    }
  }

  public getPlans() {
    console.log('getting plans')
    this.planService.getPlans(this.selectedPaidThroughPeriodOption, this.selectedSubmissionGroupOption)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data: Plan[]) => {
      console.log('data:  ', data)
      if (data && data.length) {
        this.plans = data;
      } else {
        this.plans = [];
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
