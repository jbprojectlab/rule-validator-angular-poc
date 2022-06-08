import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  panelTop: boolean = false;

  constructor() { }

  ngOnInit(): void {
    document.body.addEventListener('scroll', (e: any) => {
      if (document.body.scrollTop > 20) {
        this.panelTop = true;
      } else {
        this.panelTop = false;
      }
    })
  }
}
