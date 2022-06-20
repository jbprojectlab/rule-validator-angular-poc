// import {Component} from '@angular/core';
// import {FormControl} from '@angular/forms';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import {MatDatepicker} from '@angular/material/datepicker';

// // Depending on whether rollup is used, moment needs to be imported differently.
// // Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// // syntax. However, rollup creates a synthetic default module and we thus need to import it using
// // the `default as` syntax.
// import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;

// // See the Moment.js docs for the meaning of these formats:
// // https://momentjs.com/docs/#/displaying/format/
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// /** @title Datepicker emulating a Year and month picker */
// @Component({
//   selector: 'app-datepicker',
//   templateUrl: 'datepicker.component.html',
//   styleUrls: ['datepicker.component.sass'],
//   providers: [
//     // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
//     // application's root module. We provide it at the component level here, due to limitations of
//     // our example generation script.
//     {
//       provide: DateAdapter,
//       useClass: MomentDateAdapter,
//       deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
//     },

//     {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
//   ],
// })
// export class DatepickerComponent {
//   date = new FormControl(moment());

//   setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
//     const ctrlValue = this.date.value!;
//     console.log('ctrlValue:  ', ctrlValue)
//     ctrlValue.month(normalizedMonthAndYear.month());
//     ctrlValue.year(normalizedMonthAndYear.year());
//     this.date.setValue(ctrlValue);
//     datepicker.close();
//   }
// }

import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.sass'],
})
export class DatepickerComponent {
  date = new FormControl(moment());

  monthSelected(event: any, dp: any, input: any) {
    console.log(event)
    dp.close();
    input.value = event.toISOString().split('-').join('/').substr(0, 7);
  }
}