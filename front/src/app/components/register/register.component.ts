import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CityService} from '../../services/city-service/city.service';
import {EMPTY, Observable} from 'rxjs';
import {ICity, IRegisterUser} from '../../interfaces/interface';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {State} from '../../shared/state/state.interface';
import {cityKey} from '../../shared/state/cities/interfaces/cities.interface';
import {SetCitiesAction} from '../../shared/state/cities/cities.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form;
  cities: ICity[];
  error: string;
  subs = [];

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private userService: UserServiceService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCities();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      city_id: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  getCities(): void {
    // return this.cityService.getCities();
    let cities: ICity[] | null;
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

  createUser(body: IRegisterUser) {
    const subscription = this.userService.createUser(body)
      .pipe(
       catchError((error: string) => {
         this.error = `Error: ${error}`;
         return EMPTY;
       })
      )
      .subscribe(() => this.router.navigate(['/login']));
    this.subs.push(subscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
