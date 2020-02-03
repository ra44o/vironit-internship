import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {CityService} from '../../services/city-service/city.service';
import {IUser, ICity} from '../../interfaces/interface';
import {AuthService} from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css'],
  providers: [UserServiceService, CityService]
})
export class UserContainerComponent implements OnInit, OnDestroy {

  users: IUser[];
  cities: ICity[];

  resp;
  subscriptions = [];

  constructor(
    private userService: UserServiceService,
    private cityService: CityService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe(resp => this.users = resp));
    this.subscriptions.push(this.cityService.getCities().subscribe(resp => this.cities = resp));
  }

  createUser(body: object): void {
    this.userService.createUser(body).subscribe(response => {
      this.resp = response;
      if (response.user) {
        this.users.push(response.user);

        // this.authService.accessToken = {
        //   token: response.accessToken.token,
        //   expiresIn: response.accessToken.expiresIn * 1000 + Date.now()
        // };
        // this.authService.saveToken({
        //   token: response.refreshToken.token,
        //   expiresIn: Date.now() + response.refreshToken.expiresIn * 1000
        // });
      }

      // setTimeout(() => this.authService.getRefreshedTokens(), (this.authService.accessToken.expiresIn - 20) * 1000);
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(response => {
      this.resp = response;
      this.users  = this.users.filter(user => user._id !== id);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
