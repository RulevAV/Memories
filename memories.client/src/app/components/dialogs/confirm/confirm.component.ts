import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDataType {
  title: string,
  context: string,
}
@Component({
  selector: 'app-confirm',
  standalone: false,
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  readonly data = inject<ConfirmDataType>(MAT_DIALOG_DATA);

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>) {}

    close(): void {
    this.dialogRef.close(false); // Закрытие диалога
  }
    ok(): void {
    this.dialogRef.close(true); // Закрытие диалога
  }
}
