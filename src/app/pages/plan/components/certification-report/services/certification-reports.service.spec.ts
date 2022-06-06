import { TestBed } from '@angular/core/testing';

import { CertificationReportsService } from './certification-reports.service';

describe('CertificationReportsService', () => {
  let service: CertificationReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificationReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
