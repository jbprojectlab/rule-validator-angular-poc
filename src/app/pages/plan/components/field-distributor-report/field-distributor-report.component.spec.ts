import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDistributorReportComponent } from './field-distributor-report.component';

describe('FieldDistributorReportComponent', () => {
  let component: FieldDistributorReportComponent;
  let fixture: ComponentFixture<FieldDistributorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDistributorReportComponent ]
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
});
