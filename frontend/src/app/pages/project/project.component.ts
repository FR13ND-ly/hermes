import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FileDetailsComponent } from './ui/file-details/file-details.component';
import { FileStore } from './store/file.store';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../core/models/project.model';

@Component({
    selector: 'app-project',
    imports: [HeaderComponent, FileDetailsComponent, RouterOutlet, AsyncPipe],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss',
    providers: [FileStore]
})
export class ProjectComponent {
    fileStore = inject(FileStore);
    projectService = inject(ProjectService);
    
    route = inject(ActivatedRoute);

    project$: Observable<any> = this.projectService.getProjectById(this.route.snapshot.paramMap.get('project_id')!);
}
