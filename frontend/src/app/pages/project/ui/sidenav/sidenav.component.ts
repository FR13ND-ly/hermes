import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'project-sidenav',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  route = inject(ActivatedRoute)
  projectService = inject(ProjectService);

  projectId = this.route.snapshot.paramMap.get('id');

  projectName$: Observable<string> = this.projectService.getProjectName(this.projectId);
}
