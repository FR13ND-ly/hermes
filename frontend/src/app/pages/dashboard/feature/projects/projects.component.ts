import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../../core/services/project.service';
import { AsyncPipe } from '@angular/common';
import { ProjectItemComponent } from '../../ui/project-item/project-item.component';

@Component({
    selector: 'app-projects',
    imports: [AsyncPipe, ProjectItemComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    projectService = inject(ProjectService);

    projects$ = this.projectService.getProjects();

}
