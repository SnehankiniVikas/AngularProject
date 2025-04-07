import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksService, Task } from '../../../services/tasks.service';
import { FileUploadDialog } from './dialogs/file-upload-dialog';
import { ReleaseConfirmationDialog } from './dialogs/release-confirmation-dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  activeTab: 'pending' | 'completed' = 'pending';
  allTasks: Task[] = [];
  loading = true;
  error: string | null = null;
  showSuccessMessage = false;
  successMessage = "You've successfully uploaded the file";
  private successMessageTimeout: any;

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService
  ) {}

  get pendingTasks(): Task[] {
    return this.allTasks.filter(task => task.status === 'pending');
  }

  get completedTasks(): Task[] {
    return this.allTasks.filter(task => task.status === 'completed');
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = null;
    
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks. Please try again.';
        this.loading = false;
        console.error('Error loading tasks:', err);
      }
    });
  }

  setActiveTab(tab: 'pending' | 'completed') {
    this.activeTab = tab;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Adjust for timezone
    return adjustedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
}

  showUploadModal(subtask: any) {
    const dialogRef = this.dialog.open(FileUploadDialog, {
      width: '500px',
      data: { title: subtask.title },
      panelClass: 'upload-dialog-container',
      position: { top: '20%' },
      hasBackdrop: true,
      backdropClass: 'upload-dialog-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        subtask.selectedFile = {
          name: result.name,
          type: result.type || 'application/vnd.ms-excel',
          size: result.size,
          lastModified: result.lastModified
        };
        this.showSuccessMessage = true;
        this.successMessage = "You've successfully uploaded the file";
        if (this.successMessageTimeout) {
          clearTimeout(this.successMessageTimeout);
        }
        this.successMessageTimeout = setTimeout(() => {
          this.hideSuccessMessage();
        }, 5000);
      }
    });
  }

  hideSuccessMessage() {
    this.showSuccessMessage = false;
    if (this.successMessageTimeout) {
      clearTimeout(this.successMessageTimeout);
    }
  }

  canRelease(task: Task): boolean {
    if (!task.subtasks) return false;
    
    const requiredFiles = [
      'Upload Annual Inspection Form (MBA Form)',
      'Upload Rent Roll'
    ];
    
    return task.subtasks
      .filter(subtask => requiredFiles.includes(subtask.title))
      .every(subtask => subtask.selectedFile);
  }

  showReleaseConfirmation(task: Task) {
    const dialogRef = this.dialog.open(ReleaseConfirmationDialog, {
      width: '600px',
      disableClose: true,
      panelClass: 'release-dialog-container',
      position: { top: '20%' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.releaseToFM(task);
      }
    });
  }

  releaseToFM(task: Task) {
    this.tasksService.releaseToFM(task.id).subscribe({
      next: (updatedTask) => {
        this.allTasks = this.allTasks.map(t => 
          t.id === updatedTask.id ? updatedTask : t
        );
        
        this.showSuccessMessage = true;
        this.successMessage = "Task has been successfully released to FM";
        if (this.successMessageTimeout) {
          clearTimeout(this.successMessageTimeout);
        }
        this.successMessageTimeout = setTimeout(() => {
          this.hideSuccessMessage();
        }, 5000);
      },
      error: (err) => {
        console.error('Error releasing task to FM:', err);
        this.error = 'Failed to release task to FM. Please try again.';
      }
    });
  }

  reviewFile(subtask: any) {
    console.log('Reviewing file:', subtask.selectedFile);
  }

  downloadFile(subtask: any) {
    console.log('Downloading file:', subtask.selectedFile);
  }

  reuploadFile(subtask: any) {
    this.showUploadModal(subtask);
  }

  deleteFile(subtask: any) {
    subtask.selectedFile = null;
  }
}