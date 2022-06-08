import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should set the selected tab number', () => {
    component.selectTab(2);
    expect(component.visibleTab).toBe(2);
  })

  it('should return the selected tab 1 image', () => {
    component.visibleTab = 1;
    expect(component.getTabIconSrc(1)).toBe('assets/img/graph-white.png')
  })

  it('should return the nonselected tab 1 image', () => {
    component.visibleTab = 2;
    expect(component.getTabIconSrc(1)).toBe('assets/img/graph-black.png')
  })
  it('should return the selected tab 1 image', () => {
    component.visibleTab = 2;
    expect(component.getTabIconSrc(2)).toBe('assets/img/checklist-white.png')
  })

  it('should return the nonselected tab 1 image', () => {
    component.visibleTab = 1;
    expect(component.getTabIconSrc(2)).toBe('assets/img/checklist-black.png')
  })

  it('should set level2ChecklistIsOpen to true if it is false ', () => {
    component.level2ChecklistIsOpen = false;
    component.toggleCheckList2();
    expect(component.level2ChecklistIsOpen).toBe(true);
  })

  it('should set level2ChecklistIsOpen to false if it is true ', () => {
    component.level2ChecklistIsOpen = true;
    component.toggleCheckList2();
    expect(component.level2ChecklistIsOpen).toBe(false);
  })

  it('should set rejectsTableIsOpen to true if it is false ', () => {
    component.rejectsTableIsOpen = false;
    component.toggleRejectsTable();
    expect(component.rejectsTableIsOpen).toBe(true);
  })

  it('should set rejectsTableIsOpen to false if it is true ', () => {
    component.rejectsTableIsOpen = true;
    component.toggleRejectsTable();
    expect(component.rejectsTableIsOpen).toBe(false);
  })

  it('should set transformationsTableIsOpen to true if it is false ', () => {
    component.transformationsTableIsOpen = false;
    component.toggleTransformationsTable();
    expect(component.transformationsTableIsOpen).toBe(true);
  })

  it('should set transformationsTableIsOpen to false if it is true ', () => {
    component.transformationsTableIsOpen = true;
    component.toggleTransformationsTable();
    expect(component.transformationsTableIsOpen).toBe(false);
  })

  it('should set analyticalWarningsTableIsOpen to true if it is false ', () => {
    component.analyticalWarningsTableIsOpen = false;
    component.toggleAnalyticalWarningsTable();
    expect(component.analyticalWarningsTableIsOpen).toBe(true);
  })

  it('should set analyticalWarningsTableIsOpen to false if it is true ', () => {
    component.analyticalWarningsTableIsOpen = true;
    component.toggleAnalyticalWarningsTable();
    expect(component.analyticalWarningsTableIsOpen).toBe(false);
  })
});
