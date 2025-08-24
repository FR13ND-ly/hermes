import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-add-file-dialog',
  imports: [],
  templateUrl: './add-file-dialog.component.html',
  styleUrl: './add-file-dialog.component.scss'
})
export class AddFileDialogComponent {
  $isDragging = signal(false);
  dialogRef = inject(DialogRef);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(false);
  }

  onUploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    let formData = new FormData();
    if (input.files && input.files.length > 0) {
      formData.append('file', input.files[0]);
      this.dialogRef.close(formData)
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(false);

    const file = event.dataTransfer?.files[0];
    if (file) {
      let formData = new FormData();
      formData.append('file', file);
      this.dialogRef.close(formData)
    }
  }
}
