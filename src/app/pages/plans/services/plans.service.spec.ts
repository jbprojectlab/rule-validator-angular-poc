import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { PlansService } from './plans.service';
 
describe('PlansService', () => {
  let service: PlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should call function getOptions()', waitForAsync(inject([PlansService], (PlansService: { getOptions: () => { (): any; new(): any; subscribe: { (arg0: (result: string | any[]) => void): void; new(): any; }; }; }) => {
    PlansService.getOptions().subscribe((result: string | any[]) => expect(result.length).toBeGreaterThan(0)); 
  })));

  it('Should call function getPlans()', waitForAsync(inject([PlansService], (PlansService: { getPlans: () => { (): any; new(): any; subscribe: { (arg0: (result: string | any[]) => void): void; new(): any; }; }; }) => {
    PlansService.getPlans().subscribe((result: string | any[]) => expect(result.length).toBeGreaterThan(0)); 
  })));

  it('Should call function getPlans() with both parameters', waitForAsync(inject([PlansService], (PlansService: { getPlans: (arg0: string, arg1: number) => { (): any; new(): any; subscribe: { (arg0: (result: any) => void): void; new(): any; }; }; }) => {
    PlansService.getPlans("202112",885).subscribe((result: string | any[]) => expect(result.length).toBeGreaterThan(0)); 
  })));
});
