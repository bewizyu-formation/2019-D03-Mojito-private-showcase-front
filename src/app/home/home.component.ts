import {Component, Input, OnInit} from '@angular/core';
import {StarRatingColor} from '../star-rating/star-rating.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Artistes dans votre département';

  rating = 3;
  starCount = 5;
/*  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;*/

  constructor() { }

  ngOnInit() {
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }

}
