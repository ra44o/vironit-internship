import {ICurrentUserState, initialCurrentUserState} from './current-user/interfaces/current-user.interface';
import {ICity, initialCityState} from './cities/interfaces/cities.interface';
import {currentUserKey} from './current-user/interfaces/current-user.interface';
import {cityKey} from './cities/interfaces/cities.interface';

export interface State {
  [currentUserKey]: ICurrentUserState;
  [cityKey]: ICity[];
}

export const initialState: State = {
  [currentUserKey]: initialCurrentUserState,
  [cityKey]: initialCityState,
};
