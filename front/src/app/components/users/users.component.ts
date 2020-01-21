import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { IUser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[];
  selectedUser: IUser;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  selectUser(user): void {
    this.selectedUser = user;
  }
}
