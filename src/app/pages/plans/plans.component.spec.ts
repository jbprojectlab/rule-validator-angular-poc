import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanFilterPipe } from './pipes/plan-filter.pipe';
import { PlansComponent } from './plans.component';
import { of } from 'rxjs';
import { PlansService } from './services/plans.service';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  let mockPlansService = jasmine.createSpyObj('PlansService', ['getOptions', 'getPlans']);
  mockPlansService.getOptions.and.returnValue(of([]));
  mockPlansService.getPlans.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansComponent, PlanFilterPipe ],
      providers: [{provide: PlansService, useValue: mockPlansService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the plans ', () => {
    component.getPlans();
    expect(mockPlansService.getPlans).toHaveBeenCalled();
  })

  it('should call getPlans if paid through period and submission group are changed', () => {
    component.selectedPaidThroughPeriodOption = '202206';
    component.selectedSubmissionGroupOption = 500;
    component.paidThroughPeriod = '202205';
    component.submissionGroup = 300;
    expect(mockPlansService.getPlans).toHaveBeenCalled();
  })


  describe('CurrentPaidDate', () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date());
    })
    afterEach(() => {
      jasmine.clock().uninstall();
    })

    it('should return the current year and month as a string', () => {
      jasmine.clock().mockDate(new Date(2021,10,28));
      expect(component.getCurrentPaidDate()).toBe('202111');
    })
    it('should return the current year and month with a 0 prefixed to the month', () => {
      jasmine.clock().mockDate(new Date(2021,5,28));
      expect(component.getCurrentPaidDate()).toBe('202106');
    })
  })
});
