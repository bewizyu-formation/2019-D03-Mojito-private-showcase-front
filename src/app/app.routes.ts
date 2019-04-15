import { Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {
  PATH_EVENT,
  PATH_HOME,
  PATH_LOGIN,
  PATH_PROFIL,
  PATH_PROFIL_ARTISTE,
  PATH_REGISTER,
  PATH_WELCOME,
  PATH_WELCOME_LOG
} from './app.routes.constante';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from './auth/auth.guard';
import {WelcomeLogComponent} from './welcome/welcomeLog.component';
import {EventComponent} from './event/event.component';
import {ProfilComponent} from './profil/profil.component';
import {ArtisteComponent} from './artiste/artiste.component';

export const ROUTES: Routes = [
  { path : PATH_WELCOME  , component : WelcomeComponent},
  { path : PATH_REGISTER , component : RegisterComponent},
  { path : PATH_LOGIN    , component : LoginComponent},
  { path : PATH_HOME     , component : HomeComponent, canActivate: [AuthGuard]
  },
  { path : PATH_PROFIL, component : ProfilComponent},
  { path : PATH_EVENT, component : EventComponent},
  { path : PATH_PROFIL_ARTISTE, component: ArtisteComponent },
  { path : PATH_WELCOME_LOG, component : WelcomeLogComponent} ];






