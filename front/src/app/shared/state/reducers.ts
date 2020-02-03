import {ActionReducerMap} from '@ngrx/store';
import {State} from './state.interface';
import {cityKey} from './cities/interfaces/cities.interface';
import * as fromCities from './cities/cities.reducer';
import {currentUserKey} from './current-user/interfaces/current-user.interface';
import * as fromCurrentUser from './current-user/current-user.reducer';

// export interface IApp {
//   [cityKey]: any;
//   [currentUserKey]: any;
// }

export const reducers: ActionReducerMap<State> = {
  [cityKey]: fromCities.CitiesReducer,
  [currentUserKey]: fromCurrentUser.CurrentUserReducer,
};
