import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FileModel } from '../models/file.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  http = inject(HttpClient);

  apiUrl = environment.apiUrl + 'files';

  getProjectFiles(projectId: string, path: any, sortDirection: any, sort?: any, search?: any): Observable<FileModel[]> {
    let params = new HttpParams().set('project_id', projectId);

    if (path && path.length) {
      params = params.append('path', path.join('/'));
    }
    if (search) params = params.append('search', search);
    
    return this.http.get<FileModel[]>(this.apiUrl, { params });
  }

  getFileById(fileId: string) {
    return this.http.get(`${this.apiUrl}/${fileId}`);
  }

  uploadFile(fileData: any) {
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('projectId', fileData.projectId);
    return this.http.post<FileModel>(this.apiUrl, formData);
  }

  updateFile(fileId: string, fileData: any) {
    return this.http.put<FileModel>(`${this.apiUrl}/${fileId}`, fileData);
  }

  addFolder(folderData: any) {
    return this.http.post<FileModel>(`${this.apiUrl}/folder`, folderData);
  }

  deleteFile(fileId: string) {
    return this.http.delete<FileModel>(`${this.apiUrl}/${fileId}`);
  }
}
