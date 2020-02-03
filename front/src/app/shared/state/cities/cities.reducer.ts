import { ActionTypes as actionTypes, Actions as actions } from './cities.action';

import {initialCityState} from './interfaces/cities.interface';

function dispatchUpdateAction(state, action: actions) {
  return [
    ...state,
    ...action.payload
  ];
}

export function CitiesReducer(state = initialCityState, action: actions) {
  switch (action.type) {
    case actionTypes.SET_CITIES: {
      return dispatchUpdateAction(state, action);
    }
    default:
      return state;
  }
}
