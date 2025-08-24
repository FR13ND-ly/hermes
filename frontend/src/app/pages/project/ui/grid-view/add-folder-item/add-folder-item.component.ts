import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { AddFolderDialogComponent } from '../../add-folder-dialog/add-folder-dialog.component';

@Component({
  selector: 'add-folder-item',
  imports: [],
  templateUrl: './add-folder-item.component.html',
  styleUrl: './add-folder-item.component.scss'
})
export class AddFolderItemComponent {
  dialogRef = inject(Dialog);

  onAddFolder() {
    this.dialogRef.open(AddFolderDialogComponent, {
    });
  }
}
