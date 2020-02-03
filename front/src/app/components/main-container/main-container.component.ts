import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IUser} from '../../interfaces/interface';
import {State} from '../../shared/state/state.interface';
import {AuthService} from '../../services/auth-service/auth.service';
import {currentUserKey} from '../../shared/state/current-user/interfaces/current-user.interface';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  id: string;
  profile: string;
  currentUser: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.pipe(select(currentUserKey)).subscribe(res => this.currentUser = res);
    this.router.navigate(['user', 'profile']);
  }

  logout() {
    this.authService.logout();
  }
}
