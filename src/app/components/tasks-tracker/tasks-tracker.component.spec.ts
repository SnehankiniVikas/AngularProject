import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksTrackerComponent } from './tasks-tracker.component';
import { TasksComponent } from './tasks/tasks.component';
import { InspectionTrackerComponent } from './inspection-tracker/inspection-tracker.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../services/tasks.service';
import { of } from 'rxjs';

describe('TasksTrackerComponent', () => {
  let component: TasksTrackerComponent;
  let fixture: ComponentFixture<TasksTrackerComponent>;
  let tasksService: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const tasksServiceMock = {
      getTasks: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [
        TasksTrackerComponent,
        TasksComponent,
        InspectionTrackerComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock }
      ]
    }).compileComponents();

    tasksService = TestBed.inject(TasksService) as jest.Mocked<TasksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inspection tracker component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-inspection-tracker')).toBeTruthy();
  });

  it('should render tasks component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-tasks')).toBeTruthy();
  });

  it('should have correct layout classes', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.tasks-tracker-container')).toBeTruthy();
  });
});