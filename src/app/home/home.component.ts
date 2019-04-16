import {Component, Input, OnInit} from '@angular/core';
import {StarRatingColor} from '../star-rating/star-rating.component';
import {Router} from '@angular/router';
import {PATH_EVENT, PATH_PROFIL, PATH_PROFIL_ARTISTE, PATH_WELCOME, PATH_WELCOME_LOG} from '../app.routes.constante';
import {UserService} from '../user/user.service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Artistes dans votre département';

  voteCount = 2;
  rating = 3;
  starCount = 5;

  hidden: boolean;

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

  goToArtiste() {
    this.router.navigate([PATH_PROFIL_ARTISTE]);
  }

  Logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate([PATH_WELCOME]);
  }
  
  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;

  }

    ngOnInit() {
    }
    
}
