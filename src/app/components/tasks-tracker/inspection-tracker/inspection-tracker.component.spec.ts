import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionTrackerComponent } from './inspection-tracker.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('InspectionTrackerComponent', () => {
  let component: InspectionTrackerComponent;
  let fixture: ComponentFixture<InspectionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionTrackerComponent],
      imports: [MatCardModule, MatIconModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inspection tracker title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Inspection Tracker');
  });

  it('should render timeline', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.timeline')).toBeTruthy();
  });

  it('should render timeline items', () => {
    const compiled = fixture.nativeElement;
    const timelineItems = compiled.querySelectorAll('.timeline-item');
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it('should show correct status for completed inspections', () => {
    const compiled = fixture.nativeElement;
    const completedItems = compiled.querySelectorAll('.timeline-item.completed');
    completedItems.forEach((item: HTMLElement) => {
      expect(item.querySelector('.check')).toBeTruthy();
    });
  });

  it('should show correct status for pending inspections', () => {
    const compiled = fixture.nativeElement;
    const pendingItems = compiled.querySelectorAll('.timeline-item.pending');
    pendingItems.forEach((item: HTMLElement) => {
      expect(item.querySelector('.pending')).toBeTruthy();
    });
  });

  it('should display inspection dates', () => {
    const compiled = fixture.nativeElement;
    const dates = compiled.querySelectorAll('.date');
    expect(dates.length).toBeGreaterThan(0);
    dates.forEach((date: HTMLElement) => {
      expect(date.textContent).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });
});