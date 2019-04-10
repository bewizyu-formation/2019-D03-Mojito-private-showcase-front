import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  isHidden = true;
  title = 'Private Showcase';
  checked = false;
  myControl = new FormControl();
  options: string[] = ['Lyon', 'Marseille – Aix-en-Provence', 'Toulouse', 'Bordeaux', 'Nice', 'Strasbourg', 'Rennes'];
  filteredOptions: Observable<string[]>;

  registerForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  emailCtrl: FormControl;
  nomVilleCtrl: FormControl;
  codeVilleCtrl: FormControl;
  nomDeptCtrl: FormControl;
  codeDeptCtrl: FormControl;



  constructor(private router: Router, private user: UserService, private fb: FormBuilder) {
    // creation des controles
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.nomVilleCtrl = fb.control('', [Validators.required]);
    this.codeVilleCtrl = fb.control('', [Validators.required]);
    this.nomDeptCtrl = fb.control('', [Validators.required]);
    this.codeDeptCtrl = fb.control('', [Validators.required]);
    // création du groupe
    this.registerForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
      nomVille: this.nomVilleCtrl,
      codeVille: this.codeVilleCtrl,
      nomDept: this.nomDeptCtrl,
      codeDept: this.codeDeptCtrl
    });
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }
  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }
  goToLogPage() {
    this.user.register(`${this.usernameCtrl}`, `${this.passwordCtrl}`, `${this.emailCtrl}`,
      `${this.nomVilleCtrl}`,
      'codeVille', 'nomDept', 'codeDept');
    // .then((data) => {this.router.navigate([PATH_LOGIN]); });
  }

  getErrorMessage() {
    return this.emailCtrl.hasError('required') ? 'You must enter a value' :
      this.emailCtrl.hasError('email') ? 'Not a valid email' :
        '';
  }


  handleSubmit() {
    console.log(this.registerForm.value);
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
