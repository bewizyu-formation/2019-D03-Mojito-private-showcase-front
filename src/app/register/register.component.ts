import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  myControl = new FormControl();
  options: string[] = ['Lyon','Marseille – Aix-en-Provence','Toulouse','Bordeaux','Nice','Strasbourg','Rennes'];
  filteredOptions: Observable<string[]>;

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
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
