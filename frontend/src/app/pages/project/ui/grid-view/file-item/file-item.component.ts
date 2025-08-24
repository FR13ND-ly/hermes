import { Component, inject, input } from '@angular/core';
import { FileModel } from '../../../../../core/models/file.model';
import { FileStore } from '../../../store/file.store';
import { FileTitlePipe } from '../../../../../core/pipes/file-title.pipe';

@Component({
  selector: 'file-item',
  imports: [FileTitlePipe],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
  providers: []
})
export class FileItemComponent {
  file = input<FileModel>()
  fileStore = inject(FileStore);

  onSelectFile() {
    const file = this.file();
    if (file) {
      this.fileStore.updateFileDetails(file);
    }
  }
}
