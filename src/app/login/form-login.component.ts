import {Component, OnInit} from '@angular/core';
import {PATH_HOME, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  constructor(private router: Router) {
  }
  title = 'Private Showcase';
  isHidden = true;

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  goToHomePage() {
    this.router.navigate([PATH_HOME]);
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }

  ngOnInit() {
  }

}
