import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PATH_LOGIN, PATH_WELCOME} from '../app.routes.constante';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  isHidden = true;
  title = 'Private Showcase';
  checked = false;

  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  emailCtrl: FormControl;
  nomVilleCtrl: FormControl;
  codeVilleCtrl: FormControl;
  nomDeptCtrl: FormControl;
  codeDeptCtrl: FormControl;
  userForm: FormGroup;

  constructor(private router: Router, private user: UserService, private fb: FormBuilder) {
    // creation des controles
    this.usernameCtrl = fb.control('');
    this.passwordCtrl = fb.control('');
    this.emailCtrl = fb.control('', [Validators.email, Validators.required]);
    this.nomVilleCtrl = fb.control('');
    this.codeVilleCtrl = fb.control('');
    this.nomDeptCtrl = fb.control('');
    this.codeDeptCtrl = fb.control('');
    // création du groupe
    this.userForm = fb.group({
      username: this.usernameCtrl.value,
      password: this.passwordCtrl.value,
      email: this.emailCtrl.value,
      nomVille: this.nomVilleCtrl.value,
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
    console.log(this.userForm.value);
  }

  ngOnInit() {
  }

}
