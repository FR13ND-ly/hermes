import { Component, input, output } from '@angular/core';
import { FileModel } from '../../../../core/models/file.model';
import { AddFileItemComponent } from './add-file-item/add-file-item.component';
import { FileItemComponent } from './file-item/file-item.component';
import { FolderItemComponent } from './folder-item/folder-item.component';
import { AddFolderItemComponent } from './add-folder-item/add-folder-item.component';

@Component({
  selector: 'grid-view',
  imports: [AddFileItemComponent, FileItemComponent, FolderItemComponent, AddFolderItemComponent],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  uploadFile = output<any>();
  files = input<FileModel[]>();

  onUploadFile(file: any) {
    this.uploadFile.emit(file);
  }
}
