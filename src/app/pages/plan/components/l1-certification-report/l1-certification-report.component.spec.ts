import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { L1CertificationReportComponent } from './l1-certification-report.component';

describe('L1CertificationReportComponent', () => {
  let component: L1CertificationReportComponent;
  let fixture: ComponentFixture<L1CertificationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [L1CertificationReportComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(L1CertificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
