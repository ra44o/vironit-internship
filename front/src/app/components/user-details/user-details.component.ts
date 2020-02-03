import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IUser, ICity } from '../../interfaces/interface';
import { UserServiceService } from '../../services/user-service/user-service.service';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {CityService} from '../../services/city-service/city.service';
import {select, Store} from '@ngrx/store';
import {cityKey} from '../../shared/state/cities/interfaces/cities.interface';
import {State} from '../../shared/state/state.interface';
import {currentUserKey} from '../../shared/state/current-user/interfaces/current-user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserServiceService, CityService]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  detailsUser$: Observable<IUser>;
  form;
  updated;
  userId: string;
  cities$: Observable<ICity[]>;
  subscriptions = [];
  inputPasswordType = 'password';
  inputPasswordRepeatType = 'password';

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private location: Location,
    private fb: FormBuilder,
    private cityService: CityService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.getUser();
    this.getCities();
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [null],
      surname: [null],
      city_id: ['', [Validators.required, Validators.nullValidator]],
      login: [null, Validators.minLength(3)],
      password: [null, [Validators.minLength(3)]],
      password_repeat: [null, [Validators.minLength(3)]]
    });
  }

  getUser(): void {
    // this.userId = this.route.snapshot.paramMap.get('id');
    this.detailsUser$ = this.store.pipe(select(currentUserKey));
  }

  getCities(): void {
    this.cities$ = this.store.pipe(select(cityKey));
  }

  goBack(): void {
    this.location.back();
  }

  updateUser(body: IUser) {
    let newBody;
    const d: IUser = {};
    for (const prop in body) {
      if (body[prop]) {
        d[prop] = body[prop];
      }
    }
    if (d.password) {
      if (d.password === d.password_repeat) {
        const { password_repeat, ...obj } = d;
        newBody = obj;
      }
    }
    this.subscriptions.push(
      this.userService.updateUser(this.userId, newBody).subscribe(user => {
        this.updated = user;
        if (this.updated.msg === 'User updated') {
          this.location.back();
        }
      })
    );
  }

  changePasswordType(): void {
    if (this.inputPasswordType === 'password') {
      this.inputPasswordType = 'text';
    } else {
      this.inputPasswordType = 'password';
    }
  }

  changePasswordRepeatType(): void {
    if (this.inputPasswordRepeatType === 'password') {
      this.inputPasswordRepeatType = 'text';
    } else {
      this.inputPasswordRepeatType = 'password';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
