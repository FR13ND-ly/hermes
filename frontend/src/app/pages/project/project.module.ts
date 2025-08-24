import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { FilesComponent } from './feature/files/files.component';
import { SettingsComponent } from './feature/settings/settings.component';
import { OverviewComponent } from './feature/overview/overview.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProjectComponent, children: [
        { path: '', component: OverviewComponent },
        { path: 'files', component: FilesComponent },
        { path: 'settings', component: SettingsComponent },
      ]}
    ])
  ]
})
export class ProjectModule { }
