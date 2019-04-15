import {Component, OnInit} from '@angular/core';
import {PATH_HOME, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome2.component.html',
  styleUrls: ['./welcome.component.css']
})
export class Welcome2Component implements OnInit {
  title = 'Private Showcase';

  constructor(private router: Router) {
  }

  redirectToHome() {
    this.router.navigate([PATH_HOME]);
  }

  Logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate([PATH_WELCOME]);
  }

  ngOnInit() {
  }
}
