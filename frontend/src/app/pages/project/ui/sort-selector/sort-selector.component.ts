import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'sort-selector',
  imports: [],
  templateUrl: './sort-selector.component.html',
  styleUrl: './sort-selector.component.scss'
})
export class SortSelectorComponent {
  direction = input<'asc' | 'desc'>('asc');
  directionChange = output<'asc' | 'desc'>();
  type = input<'name' | 'date' | 'size'>('name');
  typeChange = output<'name' | 'date' | 'size'>();

  selectedIndex = computed(() => {
    switch (this.type()) {
      case 'name':
        return 0;
      case 'date':
        return 1;
      case 'size':
        return 2;
      default:
        return 0;
    }
  });

  onToggleDirection() {
    const newDirection = this.direction() === 'asc' ? 'desc' : 'asc';
    this.directionChange.emit(newDirection);
  }

  onSelectType(type: any) {
    this.typeChange.emit(type.value);
  }
}
