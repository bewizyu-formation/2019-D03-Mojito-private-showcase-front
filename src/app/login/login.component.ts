
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PATH_HOME, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserRepository} from '../user/user.repository';
import {UserService} from '../user/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {$} from "protractor";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

 // usernameCtrl = new FormControl('', [Validators.required]);
 // passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]);
  loginForm : FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  title = 'Private Showcase';
  isHidden = true;



   constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])' )]);
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
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'L\' identifiant ou le mot de passe est invalide';
      return;
    }
    this.userService.login(this.username.value, this.password.value)
      .then(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate( [PATH_HOME]);
      }, error => {
        if (error.status === 404) {
          this.errorMessage = 'Utilisateur inexistant';
        }
        if (error.status === 400) {
          this.errorMessage = 'L\' identifiant ou le mot de passe est invalide';
        }
      });
  }




  ngOnInit() {
  }

}
