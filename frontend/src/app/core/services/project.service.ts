import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'projects';
  
  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.apiUrl);
  }

  getProjectName(projectId: string | null): Observable<string> {
    return of("Project One")
  }

  getProjectById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProject(projectData: any) {
    return this.http.post(this.apiUrl, projectData);
  }

  updateProject(id: string, projectData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, projectData);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
