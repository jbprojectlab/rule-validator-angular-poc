import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CertificationReportComponent } from './certification-report.component';

describe('CertificationReportComponent', () => {
  let component: CertificationReportComponent;
  let fixture: ComponentFixture<CertificationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationReportComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(CertificationReportComponent);
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
    it('should set the flag img src to yellow when blue', () => {
      component.flagImgSrc = 'flag.png';
      component.tablesFilteredByFlag = false;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.flagImgSrc).toEqual('flag-yellow.png');
    })
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
