import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-folder-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './add-folder-dialog.component.html',
  styleUrl: './add-folder-dialog.component.scss'
})
export class AddFolderDialogComponent {
  fb = new FormBuilder();
  dialogRef = inject(DialogRef);

  folderForm = this.fb.group({
    name: ['']
  });


  handleSubmit() {
    if (this.folderForm.invalid) {
      return
    }
    this.dialogRef.close(this.folderForm.value.name);
  }
}
