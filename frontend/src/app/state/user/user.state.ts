export type User = any;

export interface UserState {
  init: boolean;
  user: User | null | boolean;
  logged: boolean;
}

export const initialState: UserState = {
  init: false,
  user: null,
  logged: false,
};

export const noUser = {
  init: true,
  user: null,
  logged: false,
};
