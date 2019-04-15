import {Component, OnInit} from '@angular/core';
import {PATH_EVENT, PATH_HOME, PATH_PROFIL, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcomeLog.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeLogComponent implements OnInit {
  title = 'Private Showcase';

  constructor(private router: Router) {
  }

  redirectToHome() {
    this.router.navigate([PATH_HOME]);
  }
  goToEvents() {
    this.router.navigate([PATH_EVENT]);
  }
  goToProfil() {
    this.router.navigate([PATH_PROFIL]);
  }

  Logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate([PATH_WELCOME]);
  }

  ngOnInit() {
  }
}
