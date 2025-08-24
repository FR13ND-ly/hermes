import { Component, inject, input } from '@angular/core';
import { FileModel } from '../../../../../core/models/file.model';
import { DatePipe } from '@angular/common';
import { FileStore } from '../../../store/file.store';

@Component({
  selector: 'file-item',
  imports: [DatePipe],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss'
})
export class FileItemComponent {
  file = input<FileModel>();
  fileStore = inject(FileStore);

  onSelectFile() {
    const file = this.file();
    if (file) {
      this.fileStore.updateFileDetails(file);
    }
  }
}
