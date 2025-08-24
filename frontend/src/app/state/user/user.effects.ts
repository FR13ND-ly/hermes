import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.actions';
import { map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoading } from '../loading/loading.actions';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store)

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.login),
      switchMap((data: any): any => {
        return this.authService
          .authentification(data)
          .pipe(map((user: any) => {
            userActions.loginSuccess(user)
        }));
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(userActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}
