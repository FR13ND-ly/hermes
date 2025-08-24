import { Component, input } from '@angular/core';
import { UserMenuComponent } from '../../../../core/components/user-menu/user-menu.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'project-header',
  imports: [UserMenuComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  project: any = input()
}
