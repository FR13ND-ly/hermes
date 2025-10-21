import { Component, inject, input, output } from '@angular/core';
import { FileModel } from '../../../../../core/models/file.model';
import { DatePipe } from '@angular/common';
import { PathStore } from '../../../store/path.store';
import { FileStore } from '../../../store/file.store';

@Component({
  selector: 'folder-item',
  imports: [DatePipe],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.scss'
})
export class FolderItemComponent {
  pathStore = inject(PathStore);
  folder = input<FileModel>()
  fileStore = inject(FileStore);

  onPathChange(newPath: string) {
    this.pathStore.addPathSegment(newPath);
  }

  onSelectFolder() {
    const folder = this.folder();
    if (folder) {
      this.fileStore.updateFileDetails(folder);
    }
  }
}
