import { Component } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'rule-validator-angular-poc';
  navIsHidden: boolean = false;

  constructor(private router: Router) {
    //Router subscriber
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            //do something on start activity
        }

        if (event instanceof NavigationError) {
            // Handle error
            console.error(event.error);
        }

        if (event instanceof NavigationEnd) {
            //do something on end activity
            console.log('end event:  ', event)
            const segments = event.url.split('/')
            console.log(segments)
            if(segments[1] && segments[1] === 'plans' && segments[2]) {
              this.navIsHidden = true
            } else if(this.navIsHidden) {
              this.navIsHidden = false
            }
        }

        console.log('nav hidden:  ', this.navIsHidden)
    });
}
  
}
