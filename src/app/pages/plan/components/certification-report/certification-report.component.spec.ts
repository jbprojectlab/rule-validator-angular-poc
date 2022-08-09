import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseReportComponent } from '../base-report/base-report.component';
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

  it('test hostlistner scroll ', () => {
    component.scrollHandler(new Event('scroll'))
    expect(component.windowScrolled).toBe(false)

  });

  it('open table toggle menu', fakeAsync(() => {
    let DebugElems: DebugElement[] = fixture.debugElement.queryAll(By.css('.open'));
   expect(DebugElems.length).toEqual(1);
 }));

 it('check getMenuItems(), initializeExpandedTables() and filterTablesByFlag() functions to be defined', () => {
  const test_=TestBed.createComponent(CertificationReportComponent)
  const app= test_.componentInstance
  let fnc=spyOn(app,"getMenuItems");
  component.reports= [{
    fileName: "PRODUCT",
    fileOrderNumber: 1,
    metricTable: [{
      metricOrderNumber: "10",
      metricDescription: "Product File 5% total rejected records",
      computedValue: 0,
      passIndicator: "-",
      ruleWeightPercent: 1,
      score: 0,
      flag: 0,
      fileOrderNumber: 10,
      errorMessage: "-",
      totalPassFail: "pass",
      totalFlag: 0,
      computedValueExpanded:false,
      valueHistory:[],
      historyPeriod: "-"}]
  }]
  component.getMenuItems();
  expect(fnc).toBeDefined()
  fnc=spyOn(app,"initializeExpandedTables");
  component. initializeExpandedTables()
  expect(fnc).toBeDefined()
  fnc=spyOn(app,"filterTablesByFlag");
  component.filterTablesByFlag()
  expect(fnc).toBeDefined()
});

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
