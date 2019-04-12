import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';

export const RESOURCES_LOGIN = '/login';
export const RESOURCES_REGISTER = '/users/create';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }

  /**
   * login the current user and get the JWT token
   * @param username User login name
   * @param password User Password
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_LOGIN}`, {
        username,
        password,
      },
      {observe: 'response'}
    );
  }

  register(username: string, password: string, email: string, nomVille: string,
           codeVille: string, codeDept: string): Promise<any> {
    const url =  `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_REGISTER}?username=${username}
    &password=${password}&email=${email}&nomVille=${nomVille}&codeVille=${codeVille}&codeDept=${codeDept}`;

    console.log('url', url);

    return this.http.post(url, {},
      {observe: 'response'}
    ).toPromise();
  }
}
