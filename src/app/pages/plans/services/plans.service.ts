import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from 'app/core/types/plan';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(private http: HttpClient) { }

  // to get the options details
  public getOptions(): Observable<any> {
    console.log('environment host:   ', environment.host)
    return this.http.get(`${environment.host}/api/summary/filters`).pipe(catchError(this.handleError));
  }

  public getPlans(paidThroughPeriod: string, submissionGroup: number, submisstionType: string= "non-ANTHEM"): Observable<Plan[]> {
    let url: string = `${environment.host}/api/summary/list`;
    console.log('url:   ', url)
    if (paidThroughPeriod && submissionGroup) {
      url += `?paiddate=${paidThroughPeriod}&submissionGroup=${submissionGroup}&submissionType=${submisstionType}`
    } else if (paidThroughPeriod) {
      url += `?paiddate=${paidThroughPeriod}&submissionType=${submisstionType}`
    } else if (submissionGroup) {
      url += `?submissionGroup=${submissionGroup}&submissionType=${submisstionType}`
    }
    return this.http.get<Plan[]>(url).pipe( catchError(this.handleError));
  }

  handleError(error: any) {
    return []
  }
}
