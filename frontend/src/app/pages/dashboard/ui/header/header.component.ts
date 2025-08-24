import { Component } from '@angular/core';
import { UserMenuComponent } from '../../../../core/components/user-menu/user-menu.component';

@Component({
  selector: 'dashboard-header',
  imports: [UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
