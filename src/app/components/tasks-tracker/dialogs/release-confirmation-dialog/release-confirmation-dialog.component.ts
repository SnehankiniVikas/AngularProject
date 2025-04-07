import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-release-confirmation-dialog',
  templateUrl: './release-confirmation-dialog.component.html',
  styleUrls: ['./release-confirmation-dialog.component.css']
})
export class ReleaseConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ReleaseConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}