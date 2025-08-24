import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);

    loginForm = this.fb.group({
        email: [''],
        password: ['']
    });


    handleSubmit() {
        this.authService.authentification(this.loginForm.value).subscribe(
            (response) => {
                localStorage.setItem('access_token', response.access_token);
                window.location.href = '/';
            },
            (error) => {
                console.error('Login failed', error);
            }
        );
    }
}
