import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CertificationReportResolversService } from './certification-report-resolvers.service';

describe('CertificationReportResolversService', () => {
  let service: CertificationReportResolversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CertificationReportResolversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
