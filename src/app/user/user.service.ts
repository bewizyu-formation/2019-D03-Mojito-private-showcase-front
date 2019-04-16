import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {HttpResponse} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token: string;

  constructor(private userRepository: UserRepository) {
  }

  /**
   * LoginComponent the user
   * @param username User login name
   * @param password User Password
   */
  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .login(username, password)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.token = response.headers.get('Authorization');
            console.log('Response Token : ', this.token);
            resolve(this.token);
          },
          error => reject(error)
        );
    });
  }

  register(username: string, password: string, email: string, nomVille: string, codeVille: string, codeDept: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .register(username, password, email, nomVille, codeVille, codeDept)
        .then((response: HttpResponse<any>) => {
            console.log(response);
            resolve();
          }, error => reject(error),
        );
    });
  }

  registerArtiste(username: string,namedArtist: string,image:string,grade:number , longDescription:string,
    shortDescription:string,webSite:string,phoneNumber :string,password: string, email: string,
    nomVille: string,codeVille:string,codeDept: string): Promise<any> {
    return new Promise((resolve) => {
    this.userRepository.registerArtiste(username,namedArtist,image,grade,nomVille,longDescription,
      shortDescription,webSite,phoneNumber,password,email,codeVille,codeDept)
     .then((response: HttpResponse<any>) => {
       console.log(response);
       resolve();
     });
    });
    }






}
