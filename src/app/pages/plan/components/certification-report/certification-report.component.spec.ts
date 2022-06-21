import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CertificationReportComponent } from './certification-report.component';
import { of } from 'rxjs';
import { CertificationReportsService } from '../../services/certification-reports.service';

describe('CertificationReportComponent', () => {
  let component: CertificationReportComponent;
  let fixture: ComponentFixture<CertificationReportComponent>;

  let mockCertificationReportService = jasmine.createSpyObj('CertificationReportsService', ['getCertificationReportData']);
  mockCertificationReportService.getCertificationReportData.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationReportComponent ],
      providers: [{provide: CertificationReportsService, useValue: mockCertificationReportService}],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
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

  it('should call the certification reports ', () => {
    component.getCertificationReportData();
    expect(mockCertificationReportService.getCertificationReportData).toHaveBeenCalled();
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

