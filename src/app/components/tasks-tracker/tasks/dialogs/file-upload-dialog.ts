import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  template: `
    <div class="upload-dialog">
      <h2>{{data.title}}</h2>
      
      <ng-container *ngIf="!selectedFile">
        <div class="upload-area" 
             (dragover)="onDragOver($event)" 
             (dragleave)="onDragLeave($event)"
             (drop)="onDrop($event)"
             (click)="fileInput.click()"
             [class.drag-over]="isDragOver">
          <div class="upload-icon">↑</div>
          <p>Drop your file here or click to browse</p>
          <input #fileInput type="file" 
                 [accept]="'.xlsx,.xls'" 
                 (change)="onFileSelected($event)" 
                 style="display: none">
        </div>
      </ng-container>

      <div class="file-info">
        <span class="info-icon">ℹ</span>
        <span>File Types: .xlsx, xls</span>
        <span class="separator">Max Size: 50Mb</span>
      </div>

      <div class="dialog-actions">
        <button class="btn-cancel" (click)="onCancel()">CANCEL</button>
        <button class="btn-upload"
                [disabled]="!selectedFile" 
                (click)="onUpload()">
          UPLOAD
        </button>
      </div>
    </div>
  `,
  styles: [`
    .upload-dialog {
      padding: 24px;
      background: white;
      border-radius: 8px;
    }

    h2 {
      margin: 0 0 24px;
      font-size: 20px;
      font-weight: 500;
      color: #1a202c;
    }

    .upload-area {
      border: 2px dashed #cbd5e0;
      border-radius: 4px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: #f7fafc;
      margin-bottom: 16px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .upload-area.drag-over {
      border-color: #4299e1;
      background: #ebf8ff;
    }

    .upload-area:hover {
      border-color: #4299e1;
      background: #ebf8ff;
    }

    .upload-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #4a5568;
      margin-bottom: 16px;
    }

    .upload-area p {
      margin: 0;
      color: #4a5568;
      font-size: 16px;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #718096;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .info-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #4299e1;
    }

    .separator {
      margin-left: 16px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-cancel {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: none;
      color: #4a5568;
      font-size: 14px;
      cursor: pointer;
    }

    .btn-upload {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: #2d3748;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }

    .btn-upload:disabled {
      background: #cbd5e0;
      cursor: not-allowed;
    }
  `]
})
export class FileUploadDialog {
  selectedFile: File | null = null;
  isDragOver = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      this.selectedFile = file;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files?.length) {
      const file = files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        this.selectedFile = file;
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpload() {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile);
    }
  }
}