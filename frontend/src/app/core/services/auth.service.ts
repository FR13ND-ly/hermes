import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  apiUrl = environment.apiUrl + 'users/';

  authentification(data: any) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}login`, data);
  }

  logout() {
    localStorage.removeItem('access_token')
    this.router.navigate(['/login']);
  }
}
