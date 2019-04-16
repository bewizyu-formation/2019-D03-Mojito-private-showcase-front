import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {Commune} from '../model/commune';
import {GeoRepository} from '../user/geo.repository';
import {Departement} from '../model/departement';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  errorMessage;
  checkboxChecked: boolean;
  options: Commune[];
  commune: Commune;

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
              private fb: FormBuilder, private geo: GeoRepository) {

    // creation des controles
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [
      Validators.required,
      Validators.pattern('(?=.{8,}$)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)'),
      ]);
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.nomVilleCtrl = fb.control('', [Validators.required]);

    // création du groupe
    this.registerForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
      commune: this.nomVilleCtrl,
      checked: this.checkedCtrl
    });
  }



  hidePassword() {
    this.isHidden = !this.isHidden;
  }

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  userRegister() {
    // console.log(this.options.find(e => e.nom === this.nomVilleCtrl.value ) );
    this.commune = this.options.find(e => e.nom === this.nomVilleCtrl.value);
    console.log(this.commune.nom + '  ' + this.commune.codeDepartement);

    this.user.register(`${this.usernameCtrl.value}`, `${this.passwordCtrl.value}`, `${this.emailCtrl.value}`,
      `${this.commune.nom}`, `${this.commune.code}`, `${this.commune.codeDepartement}`)
      .then((data) => {
        this.router.navigate([PATH_LOGIN]);
      }, error => {
        this.errorMessage = error.error.error;
      });
  }

  getErrorMessage() {
    return this.emailCtrl.hasError('email') ? 'Email non valide' :
        '';
  }

  handleDisplay() {
    if (this.checkboxChecked = true) {
      this.isDisplay = !this.isDisplay;
    }
  }

  handleSubmit() {
    console.log(this.registerForm.value);
  }


  ngOnInit() {

    // retourne la liste des communes lors de la saisie de l'élément 'Ville' du formulaire
    this.nomVilleCtrl.valueChanges.subscribe(value => {
      this.geo.getCommune(value)
        .pipe()
        .subscribe(data => {
          console.log(' =====' + data);
          this.options = data;
        }, error => {
          console.log(error);
        });
    });

  }
}
