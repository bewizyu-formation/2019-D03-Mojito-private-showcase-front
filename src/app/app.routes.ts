import { Routes } from '@angular/router';
import {FormUserComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {PATH_HOME, PATH_LOGIN, PATH_REGISTER, PATH_WELCOME} from './app.routes.constante';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';

export const ROUTES: Routes = [
  { path : PATH_WELCOME  , component : WelcomeComponent },
  { path : PATH_HOME     , component : HomeComponent },
  { path : PATH_REGISTER , component : FormUserComponent},
  { path : PATH_LOGIN    , component : LoginComponent}];




