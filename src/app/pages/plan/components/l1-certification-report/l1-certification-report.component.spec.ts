import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1CertificationReportComponent } from './l1-certification-report.component';

describe('L1CertificationReportComponent', () => {
  let component: L1CertificationReportComponent;
  let fixture: ComponentFixture<L1CertificationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1CertificationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(L1CertificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
