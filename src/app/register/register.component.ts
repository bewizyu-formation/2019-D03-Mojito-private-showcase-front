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

  checkboxChecked: boolean;

  isHidden = true;
  isDisplay: boolean;
  title = 'Private Showcase';

  myControl = new FormControl();
  options: string[] = ['Lyon', 'Nantes', 'Marseille', 'Aix-en-Provence', 'Toulouse', 'Bordeaux', 'Nice', 'Strasbourg', 'Rennes'];
  filteredOptions: Observable<string[]>;


  registerForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  emailCtrl: FormControl;
  nomVilleCtrl: FormControl;
  codeVilleCtrl: FormControl;
  nomDeptCtrl: FormControl;
  codeDeptCtrl: FormControl;
  checkedCtrl: FormControl;
  namedArtistCtrl:FormControl;
  shortDescriptionCtrl:FormControl;
  


  constructor(private router: Router, private user: UserService, private fb: FormBuilder) {
    // creation des controles
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.nomVilleCtrl = fb.control('', [Validators.required]);
    this.codeVilleCtrl = fb.control('', [Validators.required]);
    this.nomDeptCtrl = fb.control('', [Validators.required]);
    this.codeDeptCtrl = fb.control('', [Validators.required]);
   // this.namedArtistCtrl = fb.control('', [Validators.required]);
    //this.shortDescriptionCtrl = fb.control('', [Validators.required]);
    
    // création du groupe
    this.registerForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
      nomVille: this.nomVilleCtrl,
      codeVille: this.codeVilleCtrl,
      nomDept: this.nomDeptCtrl,
      codeDept: this.codeDeptCtrl,
      checked: this.checkedCtrl,
      //namedArtist:this.namedArtistCtrl,
      //shortDescription:this.shortDescriptionCtrl
    });
  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }
  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }
  goToLogPage() {
    
    this.user.register(`${this.usernameCtrl.value}`, `${this.passwordCtrl.value}`, `${this.emailCtrl.value}`,
      `${this.nomVilleCtrl.value}`,
      'codeVille', 'nomDept', 'codeDept')
      .then((data) => {this.router.navigate([PATH_LOGIN]); });
  
  }

  saveUser(){
      
    //  this.user.registerArtiste(`${this.usernameCtrl.value}`,`${this.namedArtistCtrl.value}`,'image',5 ,`${this.nomVilleCtrl.value}`,'longDescription',
    //`${this.shortDescriptionCtrl.value}`,'webSite','phoneNumber' ,`${this.passwordCtrl.value}`, `${this.emailCtrl.value}`).then((data) => {this.router.navigate([PATH_LOGIN]); });
  }

  getErrorMessage() {
    return this.emailCtrl.hasError('required') ? 'You must enter a value' :
      this.emailCtrl.hasError('email') ? 'Not a valid email' :
        '';
  }


  handleDisplay() {
    if (this.checkboxChecked = true) {
    // this.isDisplay = true;
    // } else if (this.checkboxChecked = false) {
    //   this.isDisplay = false;
      this.isDisplay = !this.isDisplay;
    }

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
