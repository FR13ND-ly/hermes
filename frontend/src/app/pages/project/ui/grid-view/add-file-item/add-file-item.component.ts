import { Component, inject } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { AddFileDialogComponent } from '../../add-file-dialog/add-file-dialog.component';

@Component({
  selector: 'add-file-item',
  imports: [DialogModule],
  templateUrl: './add-file-item.component.html',
  styleUrl: './add-file-item.component.scss'
})
export class AddFileItemComponent {
  dialogRef = inject(Dialog);

  onAddFile() {
    this.dialogRef.open(AddFileDialogComponent, {
    });
  }
}
