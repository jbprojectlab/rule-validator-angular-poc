import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})

export class SearchComponent implements OnInit {
  // selectedSubmissionGroupOption!: string;
  // selectedPaidThroughPeriodOption!: string;
  // selectedModeOption!: string;
  // selectedSubmissionControlOption!: string;
  // selectedCategoryOption!: string;

  // options: any = {
  //   submissionGroupOptions: [
  //     '100101234',
  //     '100105678',
  //     '100104321',
  //     '100109876',
  //   ],
  //   paidThroughPeriodOptions: [
  //     '202112',
  //     '202110',
  //     '202108',
  //     '202106',
  //   ],
  //   modeOptions: [
  //     'Active',
  //     'Inactive',
  //     'N/A',
  //   ],
  //   submissionControlOptions: [
  //     '23456',
  //     '23457',
  //     '23458',
  //     '23459',
  //   ],
  //   categoryOptions: [
  //     'abcd',
  //     'efgh',
  //     'ijkl',
  //     'mnop',
  //   ]
  // }

  // @Output() submissionGroupFilterEvent = new EventEmitter<string>();

  // handleSubmissionGroupChange(value: string) {
  //   console.log('value on change:  ', value)
  //   this.selectedSubmissionGroupOption = value
  //   this.submissionGroupFilterEvent.emit(value);
  // }

  // search() {
  //   console.log('value on change:  ', this.selectedSubmissionGroupOption)
  //   this.submissionGroupFilterEvent.emit(this.selectedSubmissionGroupOption);
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
