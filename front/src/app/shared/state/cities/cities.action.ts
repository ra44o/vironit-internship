import {Action} from '@ngrx/store';
import {ICity} from './interfaces/cities.interface';

export const ActionTypes = {
  SET_CITIES: 'SET_CITIES'
};

export class SetCitiesAction implements Action {
  readonly type = ActionTypes.SET_CITIES;
  constructor(public payload: any) {
  }
}

export type Actions = SetCitiesAction;
