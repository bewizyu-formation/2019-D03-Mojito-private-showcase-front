import { Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {PATH_HOME, PATH_LOGIN, PATH_REGISTER, PATH_WELCOME} from './app.routes.constante';
import {HomeComponent} from './home/home.component';
import {GuardGuard} from './guard.guard';
import {WelcomeComponent} from './welcome/welcome.component';

export const ROUTES: Routes = [
  { path : PATH_WELCOME  , component : WelcomeComponent},
  { path : PATH_REGISTER , component : RegisterComponent},
  { path : PATH_LOGIN    , component : LoginComponent},
  { path : PATH_HOME     , component : HomeComponent, canActivate: [GuardGuard] }];





