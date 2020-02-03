import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {UserContainerComponent} from './components/user-container/user-container.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {RegisterComponent} from './components/register/register.component';
import {MainContainerComponent} from './components/main-container/main-container.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
  { path: 'users', component: UserContainerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: MainContainerComponent, children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'following', component: UserContainerComponent },
      { path: 'search', component: UserContainerComponent }
    ]
  },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
