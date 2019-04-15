import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PATH_EVENT, PATH_PROFIL, PATH_WELCOME, PATH_WELCOME_LOG} from '../app.routes.constante';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Artistes dans votre département';

  constructor(private router: Router, private userService: UserService) {
  }

  redirectToWelcome() {
    this.router.navigate([PATH_WELCOME_LOG]);
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
