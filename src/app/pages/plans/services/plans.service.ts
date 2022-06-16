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
    return this.http.get(`${environment.host}/api/summary/filters`).pipe(catchError(this.handleError));
  }

  public getPlans(paidThroughPeriod: string, submissionGroup: number): Observable<Plan[]> {
    let url: string = `${environment.host}/api/summary/list`;
    if (paidThroughPeriod && submissionGroup) {
      url += `?paiddate=${paidThroughPeriod}&submissionGroup=${submissionGroup}`
    } else if (paidThroughPeriod) {
      url += `?paiddate=${paidThroughPeriod}`
    } else if (submissionGroup) {
      url += `?submissionGroup=${submissionGroup}`
    }
    return this.http.get<Plan[]>(url).pipe( catchError(this.handleError));
  }

  handleError(error: any) {
    return []
  }
}
