import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FieldDistributorReportComponent } from './field-distributor-report.component';

describe('FieldDistributorReportComponent', () => {
  let component: FieldDistributorReportComponent;
  let fixture: ComponentFixture<FieldDistributorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDistributorReportComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, OverlayModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDistributorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open table toggle menu', fakeAsync(() => {
    let DebugElems: DebugElement[] = fixture.debugElement.queryAll(By.css('.open'));
   expect(DebugElems.length).toEqual(1);
 }));

 it('check getMenuItems() and initializeExpandedTables() functions to be defined', () => {
  const test_=TestBed.createComponent(FieldDistributorReportComponent)
  const app= test_.componentInstance
  let fnc=spyOn(app,"getMenuItems");
  component.fieldDistributionReports= [{
    fields:[{
      dataTable:[{
        columnValue: "Z01.00",
        count: 400,
        cumulativeCount: 400,
        cumulativePerTotal: 20,
        perTotal: 20,
      }],
    fieldName: "Sample Name"
    }         
  ],
    fileName: "Facility Header",
  }    
]
  component.getMenuItems();
  expect(fnc).toBeDefined()
  fnc=spyOn(app,"initializeExpandedTables");
  component. initializeExpandedTables()
  expect(fnc).toBeDefined()
});

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
