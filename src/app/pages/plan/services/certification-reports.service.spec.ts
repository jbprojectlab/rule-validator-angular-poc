import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CertificationReportsService } from './certification-reports.service';

describe('CertificationReportsService', () => {
  let service: CertificationReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CertificationReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should test function getCertificationReportData() ', waitForAsync(inject([CertificationReportsService], (CertificationReportsService: { getCertificationReportData: () => { (): any; new(): any; subscribe: { (arg0: (result: any) => void): void; new(): any; }; }; }) => {
    CertificationReportsService.getCertificationReportData().subscribe(result => expect(result.length).toBeGreaterThan(0)); 
})));
});
