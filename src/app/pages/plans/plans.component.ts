import { Component, OnDestroy, OnInit } from '@angular/core';
import { Plan } from 'app/core/types/plan';
import { PlansService } from './services/plans.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.sass']
})

export class PlansComponent implements OnInit, OnDestroy {
  plans: Plan[] = [];
  searchFilter: Plan = {};
  isSearching: boolean = false;
  panelTop: boolean = false;
  selectedSortingColumn: string = 'Submission Group / Plan Code';
  sortIsAscending: boolean = true;
  destroyed$: Subject<boolean> = new Subject();
  paidThroughPeriod: string = this.getCurrentPaidDate();
  submissionGroup: number = 0;

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
    private plansService: PlansService
  ) { }

  ngOnInit(): void {
    if (this.isSearching) this.isSearching = false;

    this.plansService.getOptions().subscribe((response: any) => {
      this.options = {
        submissionGroupOptions: response.submissionGroup,
        submissionCurrentStateOptions: response.submissionCurrentState,
        categoryOptions: response.category,
        statusOptions: response.submissionStatus,
        paidThroughPeriodOptions: this.getPaidThroughPeriodOptions()
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

  getCurrentPaidDate() {
    const currentDate = new Date();
    const currentYear = String(currentDate.getFullYear());
    let currentMonth = String(currentDate.getMonth() + 1);
    if (currentMonth.length < 2) currentMonth = '0' + currentMonth;
    const currentPaidDate = currentYear + currentMonth;
    return currentPaidDate;
  }

  formatNextPaidDateOption(currentDate: string) {
    let nextDateYear = currentDate.slice(0, 4);
    let nextDateMonth = String(Number(currentDate.slice(4)) - 1);
    if (nextDateMonth === '-1') {
      nextDateYear = String(Number(nextDateYear) - 1);
      nextDateMonth = '12';
    }
    if (nextDateMonth.length < 2) {
      nextDateMonth = '0' + nextDateMonth;
    }
    const nextDate = nextDateYear + nextDateMonth;
    return nextDate;
  }

  getPaidThroughPeriodOptions() {
    let currentDate = this.getCurrentPaidDate();
    const dateOptions: string[] = [currentDate];
    for (let i = 0; i < 133; i += 1) {
      let nextDate = this.formatNextPaidDateOption(currentDate);
      currentDate = nextDate;
      dateOptions.push(currentDate);
    }
    return dateOptions;
  }


  handleSearchFilterChange(key: string, value: string | number) {
    if (key === 'paidThroughPeriod' || key === 'submissionGroup') {
      this.getPlans();
    }
    if (!value) {
      // @ts-ignore
      delete this.searchFilter[key];
    } else {
      // @ts-ignore
      this.searchFilter[key] = value;
    }
  }

  filterPlans() {
    let filtered: Plan[] = []

    for(let i = 0; i < this.plans.length; i += 1) {
      const plan = this.plans[i];
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

      let submissionGroupSearchFilter: number = Number(this.searchFilter.submissionGroup);
      let submissionGroupNumber: number = Number(submissionGroup);
      
      if (!this.searchFilter.submissionGroup || submissionGroupSearchFilter === submissionGroupNumber) {
        filteredPlan.submissionGroup = submissionGroup;
      } else continue;

      if (!this.searchFilter.paidThroughPeriod || this.searchFilter.paidThroughPeriod === paidThroughPeriod) {
        filteredPlan.paidThroughPeriod = paidThroughPeriod;
      } else continue;

      if (!this.searchFilter.submissionCurrentState || this.searchFilter.submissionCurrentState === submissionCurrentState) {
        filteredPlan.submissionCurrentState = submissionCurrentState
      } else continue;

      if (!this.searchFilter.category || this.searchFilter.category === category) {
        filteredPlan.category = category;
      } else continue;

      if (!this.searchFilter.status || this.searchFilter.status === status) {
        filteredPlan.status = status;
      } else continue;

      filtered.push(filteredPlan);
    }

    this.plans = filtered;
  }

  search() {
    this.isSearching = true;
    if (this.paidThroughPeriod !== this.selectedPaidThroughPeriodOption || this.submissionGroup != this.selectedSubmissionGroupOption) {
      this.paidThroughPeriod = this.selectedPaidThroughPeriodOption;
      this.submissionGroup = this.selectedSubmissionGroupOption;
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
      "Plan Validation Due": 'planValidationDue',
      "L2 Report Score": 'reportScoreL2'
    };
    // @ts-ignore
    const columnName = columnNames[columnHeader];
    // @ts-ignore
    const columnType = typeof this.plans[0][columnName];
    if (this.sortIsAscending) {
      this.plans = this.plans.sort((a: any, b: any) => columnType === 'number' ? a[columnName] - b[columnName] : ('' + a[columnName]).localeCompare(b[columnName]));
    } else {
      this.plans = this.plans.sort((a: any, b: any) => columnType === 'number' ? b[columnName] - a[columnName] : ('' + b[columnName]).localeCompare(a[columnName])) ;     
    }
  }

  public getPlans() {
    this.plansService.getPlans(this.selectedPaidThroughPeriodOption, this.selectedSubmissionGroupOption)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data: Plan[]) => {
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
