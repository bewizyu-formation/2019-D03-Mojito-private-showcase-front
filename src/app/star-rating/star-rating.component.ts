import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input()
  private rating: number;
  @Input()
  private starCount = 5;
  @Input()
  private color = 'primary';
  @Input()
  private voteCount: number;

  @Output()
  private voteCountUpdated = new EventEmitter();
  @Output()
  private ratingUpdated = new EventEmitter();

  private ratingArr = [];

  constructor() {
  }

  ngOnInit() {
    console.log('a ' + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
      }
  }
  // onClick(rating: number, ) {
  //   this.ratingUpdated.emit(rating);
  //   this.voteCount++;
  // }


  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}
