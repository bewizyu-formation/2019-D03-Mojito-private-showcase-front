import {Component} from '@angular/core';
import {UserService} from './user/user.service';
import {HelloRepository} from './hello/hello.repository';
import {Router} from '@angular/router';
import {PATH_LOGIN, PATH_REGISTER} from './app.routes.constante';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Private Showcase';
  token: string;

  selecetdFile: File;
  imagePreview: string;



  constructor(private userService: UserService, private hello: HelloRepository, private router: Router) {
  }

  goToLogPage() {
    this.router.navigate([PATH_LOGIN]);
  }

  goToSignPage() {
    this.router.navigate([PATH_REGISTER]);
  }

  handleSampleLogin() {
    this.userService
      .login('user', 'user')
      .then((token: string) => this.token = token,
      );
  }

  handleCheckUserRole() {
    this.hello.testApiWithUserRole()
      .subscribe(
        response => console.log('Check USER ROLE : ', response.message),
      );
  }

  handleCheckAdminRole() {
    this.hello.testApiWithAdminRole()
      .subscribe(
        response => console.log('Check ADMIN ROLE : ', response.message),
        error => console.log('ERROR ', error)
      );
  }

  onFileUpload(event) {

    this.selecetdFile = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagePreview = reader.result;
      this.hello.uploadFile(this.selecetdFile)
        .subscribe(
          () => console.log('Upload success'),
          error => console.log('Upload error', error),
        );
    };
    reader.readAsDataURL(this.selecetdFile);
  }
}

