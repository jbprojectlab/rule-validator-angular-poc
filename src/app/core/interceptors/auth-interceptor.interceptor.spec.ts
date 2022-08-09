import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthInterceptor } from './auth.interceptor';
 

describe('AuthInterceptorInterceptor', () => {
  const oktaConfig = {
    issuer: 'https://sampleokta.com/oauth2/default',
    clientId: 'sampleid',
    redirectUri: window.location.origin + '/login/callback',
  };
  const oktaAuth = new OktaAuth(oktaConfig);
  beforeEach(() => TestBed.configureTestingModule({
    imports:[OktaAuthModule],
    providers: [ {provide: OKTA_CONFIG, useValue:{oktaAuth}}, AuthInterceptor, MatSnackBarModule, MatSnackBar, Overlay ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
