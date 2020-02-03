import { Action } from '@ngrx/store';

export const ActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CURRENT_USER_SUCCESS: 'SET_CURRENT_USER_SUCCESS',
  SET_CURRENT_USER_FAILURE: 'SET_CURRENT_USER_FAILURE',
  DELETE_CURRENT_USER: 'DELETE_CURRENT_USER',
};

export class SetCurrentUserAction implements Action {
  readonly type = ActionTypes.SET_CURRENT_USER;
  constructor(public payload?: any) { }
}

export class DeleteCurrentUserAction implements Action {
  readonly type = ActionTypes.DELETE_CURRENT_USER;
  constructor(public payload: any) { }
}

export class SetCurrentUserSuccessAction implements Action {
  readonly type = ActionTypes.SET_CURRENT_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class SetCurrentUserFailureAction implements Action {
  readonly type = ActionTypes.SET_CURRENT_USER_FAILURE;
  constructor(public payload: any) { }
}

export type Actions = SetCurrentUserAction
  | DeleteCurrentUserAction
  | SetCurrentUserSuccessAction
  | SetCurrentUserFailureAction;
