import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

describe('AppComponent', () => {
  const oktaConfig = {
    issuer: 'https://sampleokta.com/oauth2/default',
    clientId: 'sampleid',
    redirectUri: window.location.origin + '/login/callback',
  };
  const oktaAuth = new OktaAuth(oktaConfig);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OktaAuthModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: OKTA_CONFIG, useValue: {oktaAuth}}]
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

  it('test hostlistner scroll ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.scrollHandler(new Event('scroll'))
    expect(app.windowScrolled).toBe(false)

  });

});
