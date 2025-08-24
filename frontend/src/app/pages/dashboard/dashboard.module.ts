import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './feature/settings/settings.component';
import { DetailsComponent } from './feature/details/details.component';
import { ProjectsComponent } from './feature/projects/projects.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent, children: [
        { path: '', component: DetailsComponent },
        { path: 'projects', component: ProjectsComponent },
        { path: 'settings', component: SettingsComponent }
      ]}
    ])
  ]
})
export class DashboardModule { }
