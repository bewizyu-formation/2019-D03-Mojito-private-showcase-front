import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Commune } from '../model/commune';

import {GeoRepository} from '../user/geo.repository';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from '@angular/core/src/util';
import { Departement } from '../model/departement';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  checkboxChecked: boolean;
  options: Commune[];
  commune : Commune;
  departement : Departement[];
  codeVille:String;
  nomDept: String;
  codeDept : String

  isHidden = true;
  isDisplay: boolean;
  title = 'Private Showcase';

  registerForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  emailCtrl: FormControl;
  nomVilleCtrl: FormControl;
  checkedCtrl: FormControl;



  constructor(private router: Router, private user: UserService,
     private fb: FormBuilder, private geo: GeoRepository ) {
    // creation des controles
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.nomVilleCtrl = fb.control('', [Validators.required]);
    
    // création du groupe
    this.registerForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
      nomVille: this.nomVilleCtrl,
      checked: this.checkedCtrl
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
      `${this.nomVilleCtrl.value}`,`${this.options[0].code}`
      , ' ', `${this.options[0].codeDepartement}`)
      .then((data) => {this.router.navigate([PATH_LOGIN]); }); 
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
    // retourne la liste des communes lor de la saisie de l'élément 'Ville' du formulaire
    this.nomVilleCtrl.valueChanges.subscribe(value => {
      
      this.geo.getCommune( value)
      .pipe()
      .subscribe(data => {
        console.log(data);
        this.options = data;
        }, error => {
        console.log(error);
      });
    })

}

}
