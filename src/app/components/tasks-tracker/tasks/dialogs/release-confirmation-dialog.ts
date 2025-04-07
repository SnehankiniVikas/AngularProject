import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-release-confirmation-dialog',
  template: `
    <div class="release-dialog">
      <div class="dialog-header">
        <h2>Confirm Release of Data to Freddie Mac</h2>
        <button mat-icon-button class="close-button" (click)="onCancel()">
          <span class="close-icon">×</span>
        </button>
      </div>
      
      <div class="dialog-content">
        <p>
          Please confirm you uploaded the appropriate files and made all required updates before 
          releasing the data to Freddie Mac. Once released, you can reopen this task within 5 days 
          or before the inspection is due, whichever date comes first.
        </p>
      </div>

      <div class="dialog-actions">
        <button mat-button class="cancel-button" (click)="onCancel()">CANCEL</button>
        <button mat-flat-button class="confirm-button" (click)="onConfirm()">CONFIRM</button>
      </div>
    </div>
  `,
  styles: [`
    .release-dialog {
      padding: 24px;
      width: 600px;
      max-width: 100%;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: #1a202c;
    }

    .close-button {
      padding: 0;
      min-width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .close-icon {
      font-size: 24px;
      color: #718096;
    }

    .dialog-content {
      margin-bottom: 24px;
    }

    p {
      margin: 0;
      color: #4a5568;
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .cancel-button {
      color: #4a5568;
    }

    .confirm-button {
      background-color: #2d3748;
      color: white;
    }
  `]
})
export class ReleaseConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<ReleaseConfirmationDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}