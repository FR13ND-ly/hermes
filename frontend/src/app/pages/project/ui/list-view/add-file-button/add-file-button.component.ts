import { Dialog } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { AddFileDialogComponent } from '../../add-file-dialog/add-file-dialog.component';

@Component({
  selector: 'add-file-button',
  imports: [],
  templateUrl: './add-file-button.component.html',
  styleUrl: './add-file-button.component.scss'
})
export class AddFileButtonComponent {
  dialogRef = inject(Dialog);

  onAddFile() {
    this.dialogRef.open(AddFileDialogComponent, {
    });
  }
}
