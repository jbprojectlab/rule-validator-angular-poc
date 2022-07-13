import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTableComponent } from './plan-table.component';

describe('PlanTableComponent', () => {
  let component: PlanTableComponent;
  let fixture: ComponentFixture<PlanTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('format decimal number to percent string', () => {
    it('should return "100%" when input is the whole number 1', () => {
      expect(component.formatDecimalToPercent(1)).toBe('100.00%');
    })

    it('should return percent string greater than "100%" when input is greater than 1', () => {
      expect(component.formatDecimalToPercent(1.27)).toBe('127.00%');
    })

    it('should return more than 200% when input is the whole number 2', () => {
      expect(component.formatDecimalToPercent(2)).toBe('200.00%');
    })

    it('should return correct percent string when input is a decimal to the tens place', () => {
      expect(component.formatDecimalToPercent(0.5)).toBe('50.00%');
    })

    it('should return correct percent string when input is a decimal to the hundreds place', () => {
      expect(component.formatDecimalToPercent(0.75)).toBe('75.00%');
    })

    it('should return correct percent string when input is a repeating decimal', () => {
      expect(component.formatDecimalToPercent(0.3333333333333333333333)).toBe('33.33%');
    })

    it('should return "0%" when input is a 0', () => {
      expect(component.formatDecimalToPercent(0)).toBe('0.00%');
    })
  })
});
