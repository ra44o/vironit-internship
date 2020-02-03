import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError, debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {
  Actions as actions,
  ActionTypes as actionTypes,
  SetCurrentUserFailureAction,
  SetCurrentUserSuccessAction
} from './current-user.action';
import {AuthService} from '../../../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable()
export class CurrentUserEffect {
  constructor(
    // tslint:disable-next-line:variable-name
    private _actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) { }

  @Effect()
  getCurrentUser = this._actions$.pipe(
    ofType(actionTypes.SET_CURRENT_USER),
    switchMap((action: actions) => this.auth.login(action.payload)
      .pipe(
        map((data) => {
          this.auth.isAuthenticated = true;

          localStorage.setItem(environment.accessToken, JSON.stringify({
            token: data.accessToken.token,
            expiresIn: Date.now() + data.accessToken.expiresIn * 1000
          }));
          localStorage.setItem(environment.refreshToken, JSON.stringify({
            token: data.refreshToken.token,
            expiresIn: Date.now() + data.refreshToken.expiresIn * 1000
          }));

          this.router.navigate(['user']);
          return new SetCurrentUserSuccessAction(data);
        }),
        catchError(error => {
          this.auth.isAuthenticated = false;
          return of(new SetCurrentUserFailureAction(error));
        })
      )
    )
  );
}
