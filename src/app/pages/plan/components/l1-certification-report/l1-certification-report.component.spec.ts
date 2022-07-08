import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { L1CertificationReportComponent } from './l1-certification-report.component';

describe('L1CertificationReportComponent', () => {
  let component: L1CertificationReportComponent;
  let fixture: ComponentFixture<L1CertificationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ L1CertificationReportComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(L1CertificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should open the menu', () => {
    component.menuIsOpen = false;
    component.openMenu();
    fixture.detectChanges();
    let menu = fixture.nativeElement.querySelector('.report-menu');
    expect(menu).toBeTruthy();
  })

  it('should close the menu', () => {
    component.menuIsOpen = true;
    component.closeMenu();
    fixture.detectChanges();
    let menu = fixture.nativeElement.querySelector('.report-menu');
    expect(menu).toBeFalsy();
  })

  describe('toggle flag filter', () => {
    it('should set the filtered tables boolean to true when false', () => {
      component.tablesFilteredByFlag = false;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.tablesFilteredByFlag).toBeTruthy();
    })
    it('should set the filtered tables boolean to false when true', () => {
      component.tablesFilteredByFlag = true;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.tablesFilteredByFlag).toBeFalsy();
    })
    it('should set the flag img src to yellow when blue', () => {
      component.flagImgSrc = 'flag.png';
      component.tablesFilteredByFlag = false;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.flagImgSrc).toEqual('flag-yellow.png');
    })
    it('should set the flag img src to blue when yellow', () => {
      component.flagImgSrc = 'flag-yellow.png';
      component.tablesFilteredByFlag = true;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.flagImgSrc).toEqual('flag.png');
    })
  })

  // it('should show more', () => {
  //   component.l1Reports.fields.showMore = false;
  //   component.openMenu();
  //   fixture.detectChanges();
  //   let menu = fixture.nativeElement.querySelector('.report-menu');
  //   expect(menu).toBeTruthy();
  // })

  // it('should show less', () => {
  //   component.l1Reports.fields.showMore = true;
  //   component.closeMenu();
  //   fixture.detectChanges();
  //   let menu = fixture.nativeElement.querySelector('.report-menu');
  //   expect(menu).toBeFalsy();
  // })

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
