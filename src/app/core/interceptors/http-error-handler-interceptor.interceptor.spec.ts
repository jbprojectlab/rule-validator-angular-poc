import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';

describe('HttpErrorHandlerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ HttpErrorHandlerInterceptor, MatSnackBarModule, MatSnackBar, Overlay ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorHandlerInterceptor = TestBed.inject(HttpErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
