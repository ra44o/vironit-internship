import { Injectable } from '@angular/core';
import Users from './users';
import { IUser } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users: IUser[];

  constructor() { }

  getUsers() {
    this.users = Users;
    return this.users;
  }
}
