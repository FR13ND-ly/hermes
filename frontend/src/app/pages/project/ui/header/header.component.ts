import { Component, inject } from '@angular/core';
import { UserMenuComponent } from '../../../../core/components/user-menu/user-menu.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'project-header',
  imports: [UserMenuComponent, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  route = inject(ActivatedRoute)
  projectService = inject(ProjectService);

  projectId = this.route.snapshot.paramMap.get('project_id');
  projectName$ = this.projectService.getProjectName(this.projectId);
}
