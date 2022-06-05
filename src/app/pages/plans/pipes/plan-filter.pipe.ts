import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planFilter'
})
export class PlanFilterPipe implements PipeTransform {
  transform(value: any[], submissionState?: string,
    category?: string, status?: string): any | null {
   
    if (value?.length !== 0) {
      value = value.filter(element => ((element.submissionCurrentState.indexOf(submissionState || '') > -1) &&
      (element.category.indexOf(category || '') > -1) && (element.status.indexOf(status || '') > -1)));
    }
    return value;
  }
}
 