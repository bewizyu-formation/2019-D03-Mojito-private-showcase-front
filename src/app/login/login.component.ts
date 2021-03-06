import {Component, OnInit} from '@angular/core';
import {PATH_HOME, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRepository} from '../user/user.repository';
import {AuthGuard} from '../auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  loginForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;

  title = 'Private Showcase';
  isHidden = true;


  constructor(private userService: UserService, private userRepo: UserRepository, private fb: FormBuilder, private router: Router,
              private guard: AuthGuard) {
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [
      Validators.required,
      Validators.pattern('(?=.{8,}$)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)')
    ]);
    this.loginForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
  }


  getErrorMessage() {
    return this.password.hasError('required') ? 'Le mot de passe est obligatoire' :
      '';
  }

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  userLogin() {
    if (!this.userRepo.login('username', 'password')) {
      this.errorMessage = 'L\' identifiant ou le mot de passe est invalide';
      return;
    }
    this.userService.login(this.username.value, this.password.value)
      .then(data => {
        this.router.navigate([PATH_HOME]);
        localStorage.setItem('currentUser', JSON.stringify(data));
      }, error => {
        if (error.status === 404) {
          this.errorMessage = 'Utilisateur inexistant';
        }
        if (error.status === 400) {
          this.errorMessage = 'L\' identifiant ou le mot de passe est invalide';
        }
        if (error.status === 403) {
          this.errorMessage = 'L\' identifiant ou le mot de passe est invalide';
        }
      });
  }

  ngOnInit() {
  }

}
