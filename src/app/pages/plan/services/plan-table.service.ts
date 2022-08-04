import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanTableService {
  constructor(private http: HttpClient) { }

  public updateReporter(data: any): Observable<any> {
    return this.http.post(`${environment.host}/api/summary/submission`,  data).pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return []
  }
}
