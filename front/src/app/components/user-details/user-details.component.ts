import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IUser } from '../../interfaces/interfaces';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() detailsUser: IUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.detailsUser = this.userService.getUsers().find(user => user._id === id);
  }

  goBack(): void {
    this.location.back();
  }
}
