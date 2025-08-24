import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileButtonComponent } from './add-file-button.component';

describe('AddFileButtonComponent', () => {
  let component: AddFileButtonComponent;
  let fixture: ComponentFixture<AddFileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFileButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
