import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../../../core/models/file.model';

@Injectable()
export class FileStore extends ComponentStore<FileModel> {
    constructor() {
        super({
            id: '',
            name: '',
            file_type: '',
            path: '',
            last_modified: new Date(),
            created: new Date(),
            size: 0,
            is_folder: false,
            project_id: ''
        });
    }

    readonly fileDetails$: Observable<any> = this.select(state => state);
    
    readonly updateFileDetails = this.updater((state, file: FileModel) => {
        return { ...state, ...file };
    });

    readonly resetFileDetails = this.updater(() => {
        return {
            id: '',
            name: '',
            file_type: '',
            path: '',
            last_modified: new Date(),
            created: new Date(),
            size: 0,
            is_folder: false,
            project_id: ''
        };
    })
}
