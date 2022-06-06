
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

  public getCertificationReportData(): Observable<any> {
    let url: string = `${environment.host}/api/l2-certification-reports`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.error(error)
    return []
  }
}
