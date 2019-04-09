
import { Component, OnInit } from '@angular/core';
import { PATH_HOME, PATH_WELCOME, PATH_LOGIN } from '../app.routes.constante';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  title = 'Private Showcase';
  isHidden = true;

  cancel() {
    this.router.navigate([PATH_WELCOME]);
  }

  goToHomePage() {

  }

  hidePassword() {
    this.isHidden = !this.isHidden;
  }

 



  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }


  ngOnInit() {
    
  }

  userLogin() : void {
    this.userService.login(this.login.value, this.password.value).then(

      (res:any)=>{ this.router.navigate([PATH_HOME]); },

      msg =>{
        this.router.navigate([PATH_LOGIN]);
      }
    );
      
      
      
     
    }
  }
  
  
      
  
 


