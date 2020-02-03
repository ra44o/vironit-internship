import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshToken: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  addHeaders(request) {
    const access = this.authService.getToken(environment.accessToken);
    if (access) {
      const authToken = `Bearer ${access.token}`;
      request = request.clone({ setHeaders: { Authorization: authToken } });
    }
    return request;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addHeaders(req);

    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 401) {
            if (Date.now() > this.authService.getToken(environment.refreshToken).expiresIn) {
              this.authService.logout({
                queryParams: {
                  authFailed: true
                }
              });
            }
            return this.authService.getRefreshedTokens().pipe(
              // concatMap(() => next.handle(this.addHeaders(req)))
              switchMap(() => next.handle(this.addHeaders(req)))
            );

          } else {
            return throwError(err.error.msg);
          }
        })
      );
  }
}
