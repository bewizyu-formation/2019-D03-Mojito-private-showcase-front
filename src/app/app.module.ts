import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_CONFIG} from './app.config';
import {TokenInterceptorService} from './services/interceptors/token-interceptor.service';
import {ErrorInterceptorService} from './services/interceptors/error-interceptor.service';
import {CommonHeadersInterceptorService} from './services/interceptors/common-headers-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatSelectModule, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import {StarRatingComponent} from './star-rating/star-rating.component';
import {UserService} from './user/user.service';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth-interceptor';
import {WelcomeLogComponent} from './welcome/welcomeLog.component';
////import { ProfilComponent } from './profil/profil.component';
////import { EventComponent } from './event/event.component';
//import { ArtisteComponent } from './artiste/artiste.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    StarRatingComponent,
    WelcomeLogComponent,
   // ProfilComponent,
   // EventComponent,
   // ArtisteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule,

  ],
  providers: [
    {provide: APP_CONFIG, useValue: environment},
    {provide : HTTP_INTERCEPTORS, useClass : CommonHeadersInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptorService, multi: true},
   // {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true},
    [UserService, AuthGuard],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
