import {Component, OnInit} from '@angular/core';
import {PATH_LOGIN, PATH_REGISTER} from '../app.routes.constante';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Private Showcase';

  constructor(private router: Router) { }
  goToLogPage() {
    this.router.navigate([PATH_LOGIN]);
  }

  goToSignPage() {
    this.router.navigate([PATH_REGISTER]);
  }
  ngOnInit() {}
}
