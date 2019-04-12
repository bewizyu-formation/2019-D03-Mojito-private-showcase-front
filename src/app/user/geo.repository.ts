import {Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';
import {Commune} from '../model/commune';
import {Departement} from '../model/departement';

export const RESOURCES_COMMUNE = '/communes/';
export const RESOURCES_DEPARTEMENT = '/departements/';

@Injectable({
  providedIn: 'root'
})
export class GeoRepository {

  constructor(private http: HttpClient, private env: EnvironmentService) {
  }



  /**
   * 
   * @param nomVille
   * 
   */
  getCommune(nomVille: string): Observable<any> {

    const params = new HttpParams().set('nom', nomVille);

    return this.http.get<Commune>(
      `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_COMMUNE}`,
       {  params } );


  }

  getDepartement(codeDept: string): Observable<any> {

    const params = new HttpParams().set('', codeDept);

    return this.http.get<Departement>(
      `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_DEPARTEMENT}${codeDept}`,
        );


  }


}
