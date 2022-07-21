import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseReportComponent } from './base-report.component';

describe('BaseReportComponent', () => {
  let component: BaseReportComponent;
  let fixture: ComponentFixture<BaseReportComponent>;
  
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

  it('check trackByFn() function', () => {
    const test_=TestBed.createComponent(BaseReportComponent)
    const app= test_.componentInstance
    const fnc=spyOn(app,"trackByFn");
    component.trackByFn(1,"test")
    expect(fnc).not.toHaveBeenCalled();
  });

  it('should close the menu', () => {
    component.menuIsOpen = true;
    component.closeMenu();
    fixture.detectChanges();
    let menu = fixture.nativeElement.querySelector('.report-menu');
    expect(menu).toBeFalsy();
  })

  describe('camelize', () => {
    it('should return the camelized version of a string with spaces', () => {
      expect(component.camelize('test string')).toBe('testString');
    })
    it('should return the camelized version of a string which has the first word capitalized', () => {
      expect(component.camelize('Capitalized string')).toBe('capitalizedString');
    })
    it('should return the camelized version of a string with many words and spaces', () => {
      expect(component.camelize('Long String with spaces')).toBe('longStringWithSpaces');
    })
  })
});
