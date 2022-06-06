import { Component } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'rule-validator';
  navIsHidden: boolean = false;
  landingPageMargin: boolean = false;

  constructor(private router: Router) {
    //Router subscriber
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            //do something on start activity
        }

        if (event instanceof NavigationError) {
            // Handle error
          }

        if (event instanceof NavigationEnd) {
            //do something on end activity
            const segments = event.url.split('/');
            if(segments[1] && segments[1] === 'plans' && segments[2]) {
              this.navIsHidden = true;
            } else if(segments[1] === 'home') {
              this.landingPageMargin = true;
            } else if(this.navIsHidden) {
              this.navIsHidden = false;
            }
        }
    });
  }
}
