import { Component, inject, output } from '@angular/core';
import { AddFolderDialogComponent } from '../../add-folder-dialog/add-folder-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { FileModel } from '../../../../../core/models/file.model';

@Component({
  selector: 'add-folder-button',
  imports: [],
  templateUrl: './add-folder-item.component.html',
  styleUrl: './add-folder-item.component.scss'
})
export class AddFolderItemComponent {
  dialogRef = inject(Dialog);
  addFolder = output<string>();

  onAddFolder() {
    let d = this.dialogRef.open(AddFolderDialogComponent);
    d.closed.subscribe((folderName: any) => {
      this.addFolder.emit(folderName);
    });
  }
}
