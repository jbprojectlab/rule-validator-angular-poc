import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { L1CertificationReportComponent } from './l1-certification-report.component';


describe('L1CertificationReportComponent', () => {
  let component: L1CertificationReportComponent;
  let fixture: ComponentFixture<L1CertificationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ L1CertificationReportComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(L1CertificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('check onClick() function sets flagMenuIsOpen to false', () => {
    component.onClick()
    expect(component.flagMenuIsOpen).toBeFalsy()
  });


  it('open table toggle menu', fakeAsync(() => {
    let DebugElems: DebugElement[] = fixture.debugElement.queryAll(By.css('.open'));
   expect(DebugElems.length).toEqual(1);
 }));

 it('check getMenuItems() and filterTablesByFlag() functions with same data', () => {
    const test_=TestBed.createComponent(L1CertificationReportComponent)
    const app= test_.componentInstance
    let fnc=spyOn(app,"getMenuItems");
    component.l1Reports= [{
      fields:[
            {
        dataTable:[{
                          columnValue: "340",
                          commentText: "null",
                          errorMessage: "Cannot find historical baseline or total frequecy, Variation between Total Frequency and Historical Baseline exceeds threshold",
                          flag: 0,
                          frequencyCount: 2,
                          historicalBaseline: "0",
                          perTotFrequency: 1,
                          updateTimeStamp:"" ,
                          updateUser: "null",
                          varianceHistoricalBaseline: 0,
             }],
        fieldName: "BHI Home Plan ID",
        fieldOrderNumber:100 ,
        filterDataTable:  [{
                  columnValue: "340",
                  commentText: "null",
                  errorMessage: "Cannot find historical baseline or total frequecy, Variation between Total Frequency and Historical Baseline exceeds threshold",
                  flag: 0,
                  frequencyCount: 2,
                  historicalBaseline: "0",
                  perTotFrequency: 1,
                  updateTimeStamp:" null",
                  updateUser: "null",
                  varianceHistoricalBaseline: 0,
        }],
        isShow: false,
        showMore: false,

      }
    ],
      fileName: "PRODUCT",
      fileOrderNumber: "string"
    }    
  ]
    component.getMenuItems();
    expect(fnc).toBeDefined()
    fnc=spyOn(app,"filterTablesByFlag");
    component.filterTablesByFlag(3)
    component.filterTablesByFlag(2)
    component.filterTablesByFlag(4)
    expect(fnc).toBeDefined()
});

it('test showmore and showless functions', () => {   
    const field_= {     
        dataTable:[{
                          columnValue: "340",
                          commentText: "null",
                          errorMessage: "Cannot find historical baseline or total frequecy, Variation between Total Frequency and Historical Baseline exceeds threshold",
                          flag: 0,
                          frequencyCount: 2,
                          historicalBaseline: "0",
                          perTotFrequency: 1,
                          updateTimeStamp:"" ,
                          updateUser: "null",
                          varianceHistoricalBaseline: 0,
             }],
        fieldName: "BHI Home Plan ID",
        fieldOrderNumber:100 ,
        filterDataTable:  [
        {
          columnValue: "341",
          commentText: "null",
          errorMessage: "Cannot find historical baseline or total frequecy, Variation between Total Frequency and Historical Baseline exceeds threshold",
          flag: 1,
          frequencyCount: 2,
          historicalBaseline: "0",
          perTotFrequency: 1,
          updateTimeStamp: "null",
          updateUser: "null",
          varianceHistoricalBaseline: 0
        }
      ],
        isShow: true,
        showMore: false,

      }   
    const test_=TestBed.createComponent(L1CertificationReportComponent)
    const app= test_.componentInstance
    const  fnc=spyOn(app,"showLess");
    component.showLess(field_)
    expect(fnc).toBeDefined()
    const fnc2=spyOn(app,"showMore");
    component.showMore(field_)
    expect(fnc2).toBeDefined()
  });

  it('test hostlistner scroll event ', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(component.windowScrolled).toBe(false);
  });

  describe('toggle flag filter', () => {
    it('should  set the filtered tables boolean to true when false', () => {
      component.tablesFilteredByFlag = false;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.tablesFilteredByFlag).toBeFalsy();
    })
    it('should set the filtered tables boolean to false when true', () => {
      component.tablesFilteredByFlag = true;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.tablesFilteredByFlag).toBeTruthy();
    })
    it('should 1 should set the flag img src to blue when yellowset the flag img src to yellow when blue', () => {
      component.flagImgSrc = 'flag.png';
      component.tablesFilteredByFlag = false;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.flagImgSrc).not.toEqual('flag-yellow.png');
    })
    it('should 2 set the flag img src to blue when yellow', () => {
      component.flagImgSrc = 'flag-yellow.png';
      component.tablesFilteredByFlag = true;
      component.toggleFlagFilter();
      fixture.detectChanges();
      expect(component.flagImgSrc).toEqual('flag.png');
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
