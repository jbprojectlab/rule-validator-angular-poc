import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthHeaderToAllowedOrigins(request)).pipe(
      catchError((error) => {
        this.snackBar.open('Error authenticating user', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'error-snackbar'
        })
        return next.handle(error);
      })
    );
  }

  private addAuthHeaderToAllowedOrigins(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let req = request;
    const allowedOrigins = ['http://localhost:4200', 'https://mdcdappl2r01lv.bcbsa.com', 'https://ndwl2validation-dev.bcbsa.com', 'https://ndwl2validation-pve.bcbsa.com', 'https://ndwl2validation.bcbsa.com'];
    // if (!!allowedOrigins.find(origin => request.url.includes(origin))) {
    //   console.log('setting headers')
    //   const authToken = this.oktaAuth.getAccessToken();
    //   req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });
    // }
    const authToken = this.oktaAuth.getAccessToken();
    req = request.clone({ setHeaders: { 'Authorization': `Bearer ${authToken}` } });

    return req;
  }
}
