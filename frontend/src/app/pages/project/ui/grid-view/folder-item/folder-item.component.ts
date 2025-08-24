import { Component, inject, input, output } from '@angular/core';
import { FileModel } from '../../../../../core/models/file.model';
import { PathStore } from '../../../store/path.store';
import { FileTitlePipe } from '../../../../../core/pipes/file-title.pipe';

@Component({
  selector: 'folder-item',
  imports: [FileTitlePipe],
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.scss'
})
export class FolderItemComponent {
  pathStore = inject(PathStore);
  folder = input<FileModel>()

  onPathChange(newPath: string) {
    this.pathStore.addPathSegment(newPath);
  }
}
