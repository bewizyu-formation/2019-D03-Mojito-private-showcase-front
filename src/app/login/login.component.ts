
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PATH_HOME, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserRepository} from '../user/user.repository';
import {UserService} from '../user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  title = 'Private Showcase';
  isHidden = true;

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
  userLogin() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'L\'email ou le mot de passe est invalide';
      return;
    }
    this.userService.login(this.login.value, this.password.value)
      .then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate( [PATH_HOME]);
      }, error => {
        if (error.status === 404) {
          this.errorMessage = 'Utilisateur inexistant';
        }
        if (error.status === 400) {
          this.errorMessage = 'L\'email ou le mot de passe est invalide';
        }
      });
  }

  ngOnInit() {
  }

}
