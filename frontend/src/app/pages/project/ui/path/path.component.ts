import { Component, inject, input, output } from '@angular/core';
import { PathStore } from '../../store/path.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'path',
  imports: [AsyncPipe],
  templateUrl: './path.component.html',
  styleUrl: './path.component.scss'
})
export class PathComponent {
  currentPath = input<string[]>([]);
  pathStore = inject(PathStore)

  onPathSegmentClick(path: string[], index: number) {
    if (index == -1) {
      this.pathStore.updatePath([]);
    } else {
      const newPath = path.slice(0, index + 1);
      this.pathStore.updatePath(newPath);
    }
  }
}
