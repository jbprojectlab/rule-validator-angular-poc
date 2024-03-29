import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit{
  title: string = 'rule-validator';
  navIsHidden: boolean = false;
  landingPageMargin: boolean = false;
  windowScrolled = false;
  isAuthenticated?: boolean;
  userName: string = '';
  profileInitials: string = '';

  constructor(private router: Router, @Inject(OKTA_AUTH) public oktaAuth: OktaAuth, public authStateService: OktaAuthStateService) {
    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationEnd) {
        const segments = event.urlAfterRedirects.split('/');

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
  @HostListener("window:scroll", [])scrollHandler($event: any){
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  moveTop($event: any){
    window.scroll(0,0);
  }
  
  async ngOnInit(){
    let email;
    let _after;
    this.authStateService.authState$.subscribe(
      (response:any) => {
        this.isAuthenticated = response.isAuthenticated;
        if(response.idToken) {
          this.userName = response.idToken.claims.name;
          localStorage.setItem("profile", this.userName)
          email = response.idToken.claims.email;
          _after = email.substring(email.indexOf('.') + 1)[0];
          this.profileInitials = email[0]+_after
        }
      }
    );
  }

  public async logout(): Promise<void> {
    await this.oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin + '/logout' });
  }
}
