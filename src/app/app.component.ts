import { Component, HostListener } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title: string = 'rule-validator';
  navIsHidden: boolean = false;
  landingPageMargin: boolean = false;
  windowScrolled = false;
  constructor(private router: Router) {
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
}
