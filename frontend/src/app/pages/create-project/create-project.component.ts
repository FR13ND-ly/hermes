import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  fb = new FormBuilder();

  projectForm = this.fb.group({
    name: ['']
  });

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
