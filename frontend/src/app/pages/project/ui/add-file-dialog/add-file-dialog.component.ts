import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-add-file-dialog',
  imports: [],
  templateUrl: './add-file-dialog.component.html',
  styleUrl: './add-file-dialog.component.scss'
})
export class AddFileDialogComponent {
  $isDragging = signal(false);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(false);
  }

  onUploadFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.$isDragging.set(false);

    const files = event.dataTransfer?.files;
    // if (files && files.length > 0) {
    //   this.filesDropped.emit(files); // Emit the dropped files
    //   console.log('Files dropped:', files);
    // }
  }
}
