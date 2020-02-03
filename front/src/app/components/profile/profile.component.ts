import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {Observable} from 'rxjs';
import {ICity, IUser} from '../../interfaces/interface';
import {FormBuilder, Validators} from '@angular/forms';
import {CityService} from '../../services/city-service/city.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../shared/state/state.interface';
import {currentUserKey, ICurrentUserState} from '../../shared/state/current-user/interfaces/current-user.interface';
import {SetCitiesAction} from '../../shared/state/cities/cities.action';
import {cityKey} from '../../shared/state/cities/interfaces/cities.interface';
import {map, shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  form;
  id: string;
  user: ICurrentUserState;
  cities: ICity[];
  buttonEditVisible: boolean;
  editFormVisible: boolean;
  inputPasswordType = 'password';
  inputPasswordRepeatType = 'password';
  subscriptions = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserServiceService,
    private cityService: CityService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

    this.store.select(currentUserKey).pipe(
      shareReplay()
    ).subscribe((res: ICurrentUserState) => {
      this.user = res;
    });
    this.getCities();
    //   .subscribe((res: ICity[]) => {
    //   this.store.dispatch(new SetCitiesAction(res));
    //   // TODO: вот здесь нужно убрать этот запрос городов, превратив его в effect
    //   this.cities = res;
    // });
  }

  getUserData(id: string): Observable<IUser[]> {
    return this.userService.getUserById(id);
  }

  getCities(): void {
    // TODO: перенести в effect
    // return this.cityService.getCities();
    let cities: ICity[] | [] | null;
    this.store.pipe(select(cityKey)).subscribe((res: ICity[] | null) => {
      cities = res;
    });
    if (cities.length === 0) {
      this.cityService.getCities().subscribe((res: ICity[]) => {
        this.cities = res;
        this.store.dispatch(new SetCitiesAction(res));
      });
    } else {
      this.cities = cities;
    }
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
      this.userService.updateUser(this.id, newBody).subscribe(() => this.editFormVisible = false)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
