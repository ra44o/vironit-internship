import { Actions as actions, ActionTypes as actionTypes } from './current-user.action';
import {ICurrentUserState, initialCurrentUserState} from './interfaces/current-user.interface';

function dispatchCurrentUserSuccessAction(state, action: actions): ICurrentUserState {
  return {
    ...state,
    ...action.payload.user[0],
    isAuthenticated: true
  };
}

function dispatchDeleteAction(state, action: actions): ICurrentUserState {
  return {
    ...state,
    ...action.payload,
    isAuthenticated: false
  };
}

function dispatchFailureAction(state, action: actions): ICurrentUserState {
  console.log('failure action', action);
  return {
    ...state,
    ...initialCurrentUserState,
    isAuthenticated: false
  };
}

export function CurrentUserReducer(state = initialCurrentUserState, action: actions): ICurrentUserState {
  switch (action.type) {
    // case actionTypes.SET_CURRENT_USER: {
    //   return dispatchUpdateAction(state, action);
    // }
    case actionTypes.DELETE_CURRENT_USER: {
      return dispatchDeleteAction(state, action);
    }
    case actionTypes.SET_CURRENT_USER_SUCCESS: {
      return dispatchCurrentUserSuccessAction(state, action);
    }
    case actionTypes.SET_CURRENT_USER_FAILURE: {
      return dispatchFailureAction(state, action);
    }
    default:
      return state;
  }
}
