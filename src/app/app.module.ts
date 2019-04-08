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
import { FormUserComponent } from './register/form-user.component';
import { FormArtistComponent } from './form-artist/form-artist.component';
import { FormLoginComponent } from './login/form-login.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule, MatIconModule,
  MatInputModule,
  MatListModule, MatSelectModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    FormUserComponent,
    FormArtistComponent,
    FormLoginComponent,
    HomeComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    MatListModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: environment},
    {provide : HTTP_INTERCEPTORS, useClass : CommonHeadersInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
