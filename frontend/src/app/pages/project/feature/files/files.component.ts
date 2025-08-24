import { Component, inject, signal } from '@angular/core';
import { FileItemComponent } from '../../ui/grid-view/file-item/file-item.component';
import { AsyncPipe } from '@angular/common';
import { FileService } from '../../../../core/services/file.service';
import { ActivatedRoute } from '@angular/router';
import { AddFileItemComponent } from '../../ui/grid-view/add-file-item/add-file-item.component';
import { ViewSelectorComponent } from '../../ui/view-selector/view-selector.component';
import { SortSelectorComponent } from '../../ui/sort-selector/sort-selector.component';
import { SearchComponent } from '../../ui/search/search.component';
import { ListViewComponent } from '../../ui/list-view/list-view.component';
import { GridViewComponent } from '../../ui/grid-view/grid-view.component';
import { PathComponent } from '../../ui/path/path.component';
import { PathStore } from '../../store/path.store';
import { switchMap } from 'rxjs';
import { FileModel } from '../../../../core/models/file.model';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-files',
  imports: [ViewSelectorComponent, SortSelectorComponent, SearchComponent, ListViewComponent, GridViewComponent, PathComponent, AsyncPipe, CdkObserveContent],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
  providers: [PathStore]
})
export class FilesComponent {
  fileService = inject(FileService);
  route = inject(ActivatedRoute);
  pathStore = inject(PathStore);

  selectedView = signal<'grid' | 'list'>('grid');
  sortType = signal<'name' | 'date' | 'size'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  
  projectId = this.route.parent?.snapshot.paramMap.get('project_id')
  files$ = this.pathStore.currentPath$.pipe(switchMap((path: any) => {
    return this.fileService.getProjectFiles(this.projectId!, path, this.sortDirection(), this.sortType(), this.route.snapshot.queryParamMap.get('search') || '');
  }));

  constructor() {
    const storedView = localStorage.getItem('selectedView') as 'grid' | 'list' | null;
    const storedSortType = localStorage.getItem('sortType') as 'name' | 'date' | 'size' | null;
    const storedSortDirection = localStorage.getItem('sortDirection') as 'asc' | 'desc' | null;
    this.selectedView.set(storedView ?? 'grid');
    this.sortType.set(storedSortType ?? 'name');
    this.sortDirection.set(storedSortDirection ?? 'asc');
  }

  reloadFiles() {
    this.files$ = this.pathStore.currentPath$.pipe(switchMap((path: any) => {
      return this.fileService.getProjectFiles(this.projectId!, path, this.sortDirection(), this.sortType(), this.route.snapshot.queryParamMap.get('search') || '');
    }));
  }

  onUploadFile(formData: any, path: any) {
    let data = {
      file: formData,
      path: path.join('/'),
      project_id: this.projectId,
      is_folder: false
    }
    this.fileService.uploadFile(data).subscribe(() => {
      this.reloadFiles();
    });
  }

  onDeleteFiles(files: FileModel[]) {
    // Handle file deletion logic here
  }

  onAddFolder(folderName: string, path: any) {
    let data = {
      name: folderName,
      path: path.join('/'),
      project_id: this.projectId,
      is_folder: true
    }
    console.log(data);
    this.fileService.addFolder(data).subscribe(() => {
      this.reloadFiles();
    })
  }

  onSelectView(view: any) {
    this.selectedView.set(view);
    localStorage.setItem('selectedView', view);
  }

  onSelectSortType(type: any) {
    this.sortType.set(type);
    localStorage.setItem('sortType', type);
  }

  onSelectSortDirection(direction: any) {
    this.sortDirection.set(direction);
    localStorage.setItem('sortDirection', direction);
  }
}
