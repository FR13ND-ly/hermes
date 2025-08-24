import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderItemComponent } from './add-folder-item.component';

describe('AddFolderItemComponent', () => {
  let component: AddFolderItemComponent;
  let fixture: ComponentFixture<AddFolderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFolderItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFolderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
