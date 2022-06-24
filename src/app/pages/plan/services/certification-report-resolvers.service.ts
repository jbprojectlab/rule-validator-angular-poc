import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CertificationReportsService } from './certification-reports.service';

@Injectable({
  providedIn: 'root'
})
export class CertificationReportResolversService implements Resolve<any> {
  constructor(private certificationReportsService: CertificationReportsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.certificationReportsService.getCertificationReportData(route.params['submissionId'],route.params['submissionType']).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}

