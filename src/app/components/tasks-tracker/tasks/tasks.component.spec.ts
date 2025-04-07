import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TasksComponent } from './tasks.component';
import { TasksService } from '../../../services/tasks.service';
import { FileUploadDialog } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { ReleaseConfirmationDialog } from './dialogs/release-confirmation-dialog/release-confirmation-dialog.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let tasksService: jest.Mocked<TasksService>;
  let dialog: jest.Mocked<MatDialog>;

  const mockTasks = [
    {
      id: 1,
      title: 'Annual Inspection Upload 2025',
      date: '2025-01-15',
      status: 'pending',
      subtasks: [
        {
          title: 'Upload Annual Inspection Form (MBA Form)',
          updated: '01/15/2025'
        }
      ]
    }
  ];

  beforeEach(async () => {
    const tasksServiceMock = {
      getTasks: jest.fn(),
      releaseToFM: jest.fn()
    };

    const dialogMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    tasksService = TestBed.inject(TasksService) as jest.Mocked<TasksService>;
    dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    tasksService.getTasks.mockReturnValue(of(mockTasks));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(component.allTasks).toEqual(mockTasks);
  });

  it('should filter pending tasks', () => {
    component.allTasks = [
      { id: 1, title: 'Task 1', date: '2025-01-15', status: 'pending' },
      { id: 2, title: 'Task 2', date: '2025-01-15', status: 'completed' }
    ];
    expect(component.pendingTasks.length).toBe(1);
    expect(component.pendingTasks[0].status).toBe('pending');
  });

  it('should filter completed tasks', () => {
    component.allTasks = [
      { id: 1, title: 'Task 1', date: '2025-01-15', status: 'pending' },
      { id: 2, title: 'Task 2', date: '2025-01-15', status: 'completed' }
    ];
    expect(component.completedTasks.length).toBe(1);
    expect(component.completedTasks[0].status).toBe('completed');
  });

  it('should format date correctly', () => {
    const formattedDate = component.formatDate('2025-01-15');
    expect(formattedDate).toBe('01/15/2025');
  });

  it('should show upload modal', () => {
    const mockDialogRef = {
      afterClosed: () => of(null)
    };
    dialog.open.mockReturnValue(mockDialogRef as any);

    const subtask = { title: 'Test Subtask' };
    component.showUploadModal(subtask);
    expect(dialog.open).toHaveBeenCalledWith(FileUploadDialog, {
      data: { title: subtask.title },
      panelClass: 'upload-dialog-container'
    });
  });

  it('should handle file upload success', () => {
    const mockFile = new File([''], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const mockDialogRef = {
      afterClosed: () => of(mockFile)
    };
    dialog.open.mockReturnValue(mockDialogRef as any);

    const subtask = { title: 'Test Subtask' };
    component.showUploadModal(subtask);
    expect(subtask['selectedFile']).toBeDefined();
    expect(component.showSuccessMessage).toBe(true);
  });

  it('should check if task can be released', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      date: '2025-01-15',
      status: 'pending',
      subtasks: [
        {
          title: 'Upload Annual Inspection Form (MBA Form)',
          selectedFile: { name: 'test.xlsx' }
        },
        {
          title: 'Upload Rent Roll',
          selectedFile: { name: 'test.xlsx' }
        }
      ]
    };
    expect(component.canRelease(task)).toBe(true);
  });

  it('should show release confirmation dialog', () => {
    const mockDialogRef = {
      afterClosed: () => of(true)
    };
    dialog.open.mockReturnValue(mockDialogRef as any);
    tasksService.releaseToFM.mockReturnValue(of({ ...mockTasks[0], status: 'completed' }));

    const task = mockTasks[0];
    component.showReleaseConfirmation(task);
    expect(dialog.open).toHaveBeenCalledWith(ReleaseConfirmationDialog, {
      width: '600px',
      disableClose: true,
      panelClass: 'release-dialog-container'
    });
  });

  it('should release task to FM when confirmed', () => {
    const updatedTask = { ...mockTasks[0], status: 'completed' };
    tasksService.releaseToFM.mockReturnValue(of(updatedTask));

    component.releaseToFM(mockTasks[0]);
    expect(tasksService.releaseToFM).toHaveBeenCalledWith(mockTasks[0].id);
    expect(component.showSuccessMessage).toBe(true);
    expect(component.successMessage).toBe('Task has been successfully released to FM');
  });

  it('should handle error when releasing task', () => {
    tasksService.releaseToFM.mockReturnValue(of(new Error('Error')));
    component.releaseToFM(mockTasks[0]);
    expect(component.error).toBe('Failed to release task to FM. Please try again.');
  });
});