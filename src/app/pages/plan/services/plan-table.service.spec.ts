import { TestBed } from '@angular/core/testing';

import { PlanTableService } from './plan-table.service';

describe('PlanTableService', () => {
  let service: PlanTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
