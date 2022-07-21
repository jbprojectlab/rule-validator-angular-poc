import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

describe('AppComponent', () => {
  const oktaConfig = {
    issuer: 'https://dev-88074172.okta.com/oauth2/default',
    clientId: '0oa5tknywtLiDURf95d7',
    redirectUri: window.location.origin + '/login/callback',
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OktaAuthModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: OKTA_CONFIG, useValue: oktaConfig}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rule-validator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rule-validator');
  });

});
