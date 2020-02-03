import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserServiceService} from '../../services/user-service/user-service.service';
import {AuthService} from '../../services/auth-service/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {SetCurrentUserAction} from '../../shared/state/current-user/current-user.action';
import {State} from '../../shared/state/state.interface';
import {currentUserKey} from '../../shared/state/current-user/interfaces/current-user.interface';
import {IUser} from '../../interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserServiceService]
})
export class LoginComponent implements OnInit, OnDestroy {

  form;
  subs = [];
  message: string;
  submittedForm: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    // const token = JSON.parse(localStorage.getItem(environment.accessToken));
    // if (token) {
    //   if (token.expiresIn > Date.now()) {
    //     console.log('aaaa');
    //     this.authService.isAuthenticated = true;
    //     this.router.navigate([`user`]);
    //   }
    // }
    this.createForm();
    this.subs.push(
      this.route.queryParams.subscribe((params: Params) => {
        if (params.authFailed) {
          this.message = 'Please, enter your credentials';
        }
      })
    );
  }

  createForm(): void {
    this.form = this.fb.group({
      login: ['ra44o', [Validators.required, Validators.minLength(3)]],
      password: ['rak123', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit(formValue): void {
    this.store.dispatch(new SetCurrentUserAction(formValue));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
