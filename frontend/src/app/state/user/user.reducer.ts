import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UserState, initialState, noUser } from './user.state';
import { userActions } from './user.actions';

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,

    on(userActions.login, (state: UserState): UserState => state),

    on(userActions.logout, (state: UserState): UserState => noUser),

    on(userActions.loginSuccess, (state: UserState, user: any): any => {
      return {
        init: true,
        user: user,
      };
    })
  ),
});

export const { name, reducer, selectInit, selectUser } = userFeature;
