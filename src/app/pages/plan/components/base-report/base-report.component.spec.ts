import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseReportComponent } from './base-report.component';

describe('BaseReportComponent', () => {
  let component: BaseReportComponent;
  let fixture: ComponentFixture<BaseReportComponent>;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ BaseReportComponent ]
  //   }).compileComponents();
  //   fixture = TestBed.createComponent(BaseReportComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // // it('should open the menu', () => {
  // //   component.menuIsOpen = false;
  // //   component.openMenu();
  // //   fixture.detectChanges();
  // //   let menu = fixture.nativeElement.querySelector('.report-menu');
  // //   expect(menu).toBeTruthy();
  // // })

  // it('should close the menu', () => {
  //   component.menuIsOpen = true;
  //   component.closeMenu();
  //   fixture.detectChanges();
  //   let menu = fixture.nativeElement.querySelector('.report-menu');
  //   expect(menu).toBeFalsy();
  // })

  // describe('camelize', () => {
  //   it('should return the camelized version of a string with spaces', () => {
  //     expect(component.camelize('test string')).toBe('testString');
  //   })
  //   it('should return the camelized version of a string which has the first word capitalized', () => {
  //     expect(component.camelize('Capitalized string')).toBe('capitalizedString');
  //   })
  //   it('should return the camelized version of a string with many words and spaces', () => {
  //     expect(component.camelize('Long String with spaces')).toBe('longStringWithSpaces');
  //   })
  // })
});
