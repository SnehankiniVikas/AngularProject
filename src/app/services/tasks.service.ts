import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  date: string;
  status: 'pending' | 'completed';
  expanded?: boolean;
  releasedToFM?: boolean;
  subtasks?: {
    title: string;
    updated?: string;
    showUploadModal?: boolean;
    selectedFile?: FileInfo;
    status?: 'pending' | 'completed';
  }[];
}

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  uploadDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Annual Inspection Upload 2025',
      date: '2025-04-08',
      status: 'pending',
      expanded: false,
      releasedToFM: false,
      subtasks: [
        {
          title: 'Upload Annual Inspection Form (MBA Form)',
          updated: this.formatDate(new Date()),
          showUploadModal: false,
          status: 'pending'
        },
        {
          title: 'Upload Rent Roll',
          updated: this.formatDate(new Date()),
          showUploadModal: false,
          status: 'pending'
        },
        {
          title: 'Update Open Items (in Open Items tab)',
          updated: this.formatDate(new Date()),
          status: 'pending'
        }
      ]
    },
    {
      id: 3,
      title: 'Initial Property Assessment',
      date: '2022-10-02', // Past date - completed
      status: 'completed'
    },
    {
      id: 4,
      title: 'Annual Property Review',
      date: '2023-10-07', // Past date - completed
      status: 'completed'
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(
      map(tasks => {
        const currentDate = this.normalizeDate(new Date()); // Normalize current date to midnight
        console.log('Normalized Current Date:', currentDate);
  
        return tasks.map(task => {
          const taskDate = this.normalizeDate(new Date(task.date)); // Normalize task date to midnight
          console.log('Task Date:', taskDate);
  
          // If the task is pending, check the date
          if (task.status === 'pending') {
            if (taskDate.getDate() > currentDate.getDate()) {
              console.log(`Task "${task.title}" is in the future. Marking as completed.`);
              return { ...task, status: 'completed' as const };
            }
            console.log(`Task "${task.title}" is today or in the past. Keeping as pending.`);
            return task;
          }
          return task;
        });
      }),
      delay(500) // Simulate API delay
    );
  }

  updateTaskDate(taskId: number, newDate: string): Observable<Task> {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.date = newDate;
      // Update all subtask dates
      if (task.subtasks) {
        const formattedDate = this.formatDate(new Date(newDate));
        task.subtasks.forEach(subtask => {
          subtask.updated = formattedDate;
        });
      }
    }
    return of(task!).pipe(delay(500));
  }

  updateFileUpload(taskId: number, subtaskTitle: string, file: FileInfo): Observable<Task> {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && task.subtasks) {
      const subtask = task.subtasks.find(s => s.title === subtaskTitle);
      if (subtask) {
        subtask.selectedFile = {
          ...file,
          uploadDate: new Date().toISOString()
        };
        subtask.updated = this.formatDate(new Date());
      }
    }
    return of(task!).pipe(delay(500));
  }

  releaseToFM(taskId: number): Observable<Task> {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.releasedToFM = true;
      if (task.subtasks) {
        task.subtasks.forEach(subtask => {
          subtask.status = 'completed';
        });
      }
      task.status = 'completed';
    }
    return of(task!).pipe(delay(500));
  }

  addTask(task: Task): Observable<Task> {
    this.tasks = [...this.tasks, task];
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    return of(task);
  }

  deleteTask(id: number): Observable<boolean> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(true);
  }

  // Helper method to normalize dates to UTC
  private normalizeDate(date: Date): Date {
    date.setHours(0, 0, 0, 0); // Normalize to midnight
    return date;
  }

  // Helper method to format dates for display
  private formatDate(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }
}