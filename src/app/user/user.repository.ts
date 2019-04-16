import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';

export const RESOURCES_LOGIN = '/login';
export const RESOURCES_REGISTER = '/users/create';
export const RESOURCES_REGISTER_ARTISTE = '/artistes/create';
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

  registerArtiste(username: string, namedArtist: string, image: string, grade: number , nomVille: string, longDescription: string,
    shortDescription: string, webSite: string, phoneNumber: string, password: string, email: string, codeVille: string, codeDept: string)
    : Promise<any> {
const url =  `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_REGISTER_ARTISTE}?username=${username}
&namedArtist=${namedArtist}&image=${image}  &grade=${grade}
&nomVille=${nomVille}&longDescription=${longDescription}&shortDescription=${shortDescription}&webSite=${webSite}
&phoneNumber=${phoneNumber}&password=${password}&email=${email}&codeVille=${codeVille}&codeDept=${codeDept}`;

  console.log('url', url);

  return this.http.post(url, {},

  ).toPromise();
  }

getAllArtiste() {
    return this.http.get(`${this.env.getPrivateShowcaseApiConfig().uri/artistes}`);
}

}
