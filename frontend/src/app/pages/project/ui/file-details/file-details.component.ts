import { Component, inject } from '@angular/core';
import { FileStore } from '../../store/file.store';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'file-details',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss'
})
export class FileDetailsComponent {
  fileStore = inject(FileStore);

  fileDetails$ = this.fileStore.fileDetails$;

  onEditFile(fileId: string) {
    // const fileDetails = this.fileStore.get();
  }

  onDeleteFile(fileId: string) {
    // this.fileStore.deleteFile(fileId);
  }
}
