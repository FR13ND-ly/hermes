import { Component, inject } from '@angular/core';
import { FileStore } from '../../store/file.store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FileService } from '../../../../core/services/file.service';

@Component({
  selector: 'file-details',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss'
})
export class FileDetailsComponent {
  fileStore = inject(FileStore);
  fileService = inject(FileService);
  fileDetails$ = this.fileStore.fileDetails$;

  onEditFile(fileId: string) {
    // const fileDetails = this.fileStore.get();
  }

  onDeleteFile(fileId: string) {
    this.fileService.deleteFile(fileId).subscribe(console.log)
  }
}
