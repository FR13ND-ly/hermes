import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { FileDetailsComponent } from './ui/file-details/file-details.component';
import { FileStore } from './store/file.store';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-project',
    imports: [HeaderComponent, FileDetailsComponent, RouterOutlet, AsyncPipe],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss',
    providers: [FileStore]
})
export class ProjectComponent {
    fileStore = inject(FileStore);
}
