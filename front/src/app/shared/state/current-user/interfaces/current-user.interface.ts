export interface ICurrentUserState {
  _id: string | null;
  name: string | null;
  surname: string | null;
  is_user_active: boolean | null;
  fromCity: string | null;
  login: string | null;
  isAuthenticated: boolean | null;
}

export const currentUserKey = 'currentUser';

export const initialCurrentUserState: ICurrentUserState = {
  _id: null,
  name: null,
  surname: null,
  is_user_active: null,
  fromCity: null,
  login: null,
  isAuthenticated: null
};
