import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IAccessRefreshTokens, IToken} from '../../interfaces/interface';
import {catchError, map} from 'rxjs/operators';
import {Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../shared/state/state.interface';
import {DeleteCurrentUserAction} from '../../shared/state/current-user/current-user.action';
import {initialCurrentUserState} from '../../shared/state/current-user/interfaces/current-user.interface';
import {empty} from 'rxjs/internal/Observer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessToken;
  public isAuthenticated = false;
  static saveToken(item: IToken, name: string): void {
    localStorage.setItem(name, JSON.stringify(item));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) { }

  login(formValue): Observable<IAccessRefreshTokens> {
    return this.http.post<IAccessRefreshTokens>(`${environment.url}/login`, formValue);
      // .pipe(
        // catchError((err: HttpErrorResponse) => {
        //   if (err.status === 401) {
        //     console.log('Please check your credentials and enter them again');
        //     // return empty;
        //     return throwError(err);
        //   }
        //
        //   return throwError(err);
        // })
      // );
  }

  logout(params?: Params): void {
    this.isAuthenticated = false;
    this.removeToken(environment.accessToken);
    this.removeToken(environment.refreshToken);
    this.store.dispatch(new DeleteCurrentUserAction(initialCurrentUserState));
    this.router.navigate(['login']);
  }



  getToken(name: string): IToken {
    return JSON.parse(localStorage.getItem(name));
  }

  removeToken(name: string): void {
    localStorage.removeItem(name);
  }

  getRefreshedTokens() {
    const refreshToken: IToken = this.getToken(environment.refreshToken);
    if (refreshToken) {
      if (Date.now() < refreshToken.expiresIn) {
        return this.http.post<IAccessRefreshTokens>(`${environment.url}/refresh`, {refreshToken: refreshToken.token})
          .pipe(
            map((response) => {
              AuthService.saveToken({
                  token: response.refreshToken.token,
                  expiresIn: Date.now() + response.refreshToken.expiresIn * 1000
                },
                environment.refreshToken
              );
              AuthService.saveToken({
                  token: response.accessToken.token,
                  expiresIn: Date.now() + response.accessToken.expiresIn * 1000
                },
                environment.accessToken
              );
              return;
            }),
            catchError((err: HttpErrorResponse) => {
              return throwError(`ошибка из auth.service: ${err.error.msg}`);
          }));
      } else {
        this.logout({
          queryParams: {
            authFailed: true
          }
        });
      }
    } else {
      this.logout({
        queryParams: {
          authFailed: true
        }
      });
    }
  }
}
