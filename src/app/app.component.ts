import { Component, Inject } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'rule-validator';
  navIsHidden: boolean = false;
  landingPageMargin: boolean = false;
  isAuthenticated?: boolean;
  userName: string = '';
  profileInitials: string = '';

  constructor(private router: Router, @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authStateService: OktaAuthStateService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const segments = event.url.split('/');

        if (segments[1] && segments[1] === 'plans' && segments[2]) {
          this.navIsHidden = true;
        } else if (this.navIsHidden) {
          this.navIsHidden = false;
        }

        if (segments[1] === 'home' || !segments[1].length) {
          this.landingPageMargin = true;
          this.navIsHidden = true;
        } else if (this.landingPageMargin) {
          this.landingPageMargin = false;
        }
      }
    });
  }
  
  async ngOnInit(){
    console.log('app init')
    let email;
    let _after;
    this.authStateService.authState$.subscribe(
      (response:any) => {
        console.log('response:   ', response)
        this.isAuthenticated = response.isAuthenticated;
        if(response.idToken) {
          this.userName = response.idToken.claims.name;
          email = response.idToken.claims.email;
          _after = email.substring(email.indexOf('.') + 1)[0];
          this.profileInitials = email[0]+_after
        }
      }
    );
  }

  public async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
