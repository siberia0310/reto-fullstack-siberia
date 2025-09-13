import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-create-user-dialog',
  templateUrl: './confirm-create-user.dialog.html',
  styleUrls: ['./confirm-create-user.dialog.scss'],
  standalone: false,
})
export class ConfirmCreateUserDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmCreateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
