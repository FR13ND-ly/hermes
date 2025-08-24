import { Component, input, output } from '@angular/core';
import { FileModel } from '../../../../core/models/file.model';
import { AddFileButtonComponent } from './add-file-button/add-file-button.component';
import { FileItemComponent } from './file-item/file-item.component';
import { FolderItemComponent } from './folder-item/folder-item.component';
import { AddFolderItemComponent } from './add-folder-item/add-folder-item.component';

@Component({
  selector: 'list-view',
  imports: [AddFileButtonComponent, AddFolderItemComponent, FileItemComponent, FolderItemComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
  files = input<FileModel[]>();
  addFolder = output<string>();

  onAddFolder(folderName: string) {
    this.addFolder.emit(folderName);
  }
}
