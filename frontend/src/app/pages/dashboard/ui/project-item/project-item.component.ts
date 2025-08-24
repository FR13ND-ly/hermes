import { Component, input } from '@angular/core';
import { ProjectModel } from '../../../../core/models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'project-item',
  imports: [RouterLink],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss'
})
export class ProjectItemComponent {
  project = input<ProjectModel>();
}
