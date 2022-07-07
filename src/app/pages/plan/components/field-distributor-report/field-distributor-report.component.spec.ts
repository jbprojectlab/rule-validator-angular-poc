import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
