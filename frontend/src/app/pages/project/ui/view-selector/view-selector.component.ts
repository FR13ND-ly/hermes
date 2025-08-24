import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'view-selector',
  imports: [],
  templateUrl: './view-selector.component.html',
  styleUrl: './view-selector.component.scss'
})
export class ViewSelectorComponent {
  selectedView = input('grid');
  viewChange = output<'grid' | 'list'>();

  $selectedView = computed(() => this.selectedView());

  onSelectView(view: 'grid' | 'list') {
    this.viewChange.emit(view);
  }
}
