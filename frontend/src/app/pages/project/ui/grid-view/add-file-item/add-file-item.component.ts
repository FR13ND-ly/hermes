import { Component, inject, output } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { AddFileDialogComponent } from '../../add-file-dialog/add-file-dialog.component';

@Component({
  selector: 'add-file-item',
  imports: [DialogModule],
  templateUrl: './add-file-item.component.html',
  styleUrl: './add-file-item.component.scss'
})
export class AddFileItemComponent {
  uploadFile = output<any>();
  dialogRef = inject(Dialog);

  onAddFile() {
    let d = this.dialogRef.open(AddFileDialogComponent);
    d.closed.subscribe((result) => {
      if (result) {
        this.uploadFile.emit(result);
      }
    });
  }
}
