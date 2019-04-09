import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  isHidden = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  title = 'Private Showcase';
  checked = false;

  constructor(private router: Router) {
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  goToLogPage() {
    this.router.navigate([PATH_LOGIN]);
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
  }

}
