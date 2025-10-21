import { Component, inject, input, output } from '@angular/core';
import { FileModel } from '../../../../../core/models/file.model';
import { PathStore } from '../../../store/path.store';
import { ShortenPipe } from '../../../../../core/pipes/shorten.pipe';
import { FileStore } from '../../../store/file.store';

@Component({
  selector: 'folder-item',
  imports: [ShortenPipe],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.scss'
})
export class FolderItemComponent {
  pathStore = inject(PathStore);
  folder = input<FileModel>()
  fileStore = inject(FileStore);

  onSelectFolder() {
    const folder = this.folder();
    if (folder) {
      this.fileStore.updateFileDetails(folder);
    }
  }
  
  onPathChange(newPath: string) {
    this.pathStore.addPathSegment(newPath);
  }
}
