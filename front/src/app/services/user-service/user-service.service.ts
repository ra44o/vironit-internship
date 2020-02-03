import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser, ICreateUserResponse } from '../../interfaces/interface';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.url);
  }

  getUserById(id: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.url}/${id}`);
  }

  createUser(body: IUser): Observable<ICreateUserResponse> {
    return this.http.post<ICreateUserResponse>(environment.url, body);
  }

  updateUser(id: string, body: IUser): Observable<object> {
    return this.http.put<object>(`${environment.url}/${id}`, body);
  }

  deleteUser(id: string): Observable<object> {
    return this.http.delete(`${environment.url}/${id}`);
  }


}
