import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectComponent } from './components/select/select.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SelectComponent,
    FooterComponent
  ],
  imports: [
    RouterModule
    
  ],
  exports: [
    NavbarComponent,
    SelectComponent,
    FooterComponent
  ],
  providers: [],
  
})
export class SharedModule { }
