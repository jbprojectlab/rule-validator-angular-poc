import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationReportComponent } from './certification-report.component';

describe('CertificationReportComponent', () => {
  let component: CertificationReportComponent;
  let fixture: ComponentFixture<CertificationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
