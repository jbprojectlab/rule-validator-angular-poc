import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './auth.interceptor';
 

describe('AuthInterceptorInterceptor', () => {
  const oktaConfig = {
    issuer: 'https://dev-88074172.okta.com/oauth2/default',
    clientId: '0oa5tknywtLiDURf95d7',
    redirectUri: window.location.origin + '/login/callback',
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ {provide: OKTA_CONFIG, useValue: oktaConfig}, AuthInterceptor, MatSnackBarModule, MatSnackBar, Overlay ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
