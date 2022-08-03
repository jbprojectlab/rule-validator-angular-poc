
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificationReportsService {
  selectedSubmissionId!: string;
  selectedSubmissionType!: string;
  responseData!: any;
  constructor(private http: HttpClient) { }

  public getCertificationReportData(subId: string, subType: string): Observable<any> {
    if (subId === this.selectedSubmissionId && subType === this.selectedSubmissionType && this.responseData) {
      return this.responseData;
    } else {
      this.selectedSubmissionId = subId;
      this.selectedSubmissionType = subType;
      let url: string = `${environment.host}/api/summary/report?submissionId=${subId}&submissionType=${subType}`;
      this.responseData = this.http.get<any>(url).pipe(catchError(this.handleError));
      return this.responseData;
    }
  }

  handleError(error: any) {
    return []
  }
}
