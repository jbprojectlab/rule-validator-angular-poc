
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificationReportsService {
  constructor(private http: HttpClient) { }

  public getCertificationReportData(subId: string, subType: string): Observable<any> {
    let url: string = `${environment.host}/api/db/report?submissionId=${subId}&submissionType=${subType}`
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return []
  }
}
