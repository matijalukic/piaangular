import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fair} from '../models/fair';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
  })
};


@Injectable({
  providedIn: 'root'
})
export class FairsService {

    constructor(public httpClient: HttpClient) { }

    public static getToken(): string{
      return localStorage.getItem('idToken');
    }

    fairs(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/admin/fairs', httpOptions);
    }

    /**
     * Inserting new fair
     * @param newFair : Fair
     */
    insertNewFair(newFair: Fair): Observable<any>{
          let token = localStorage.getItem('idToken');
          console.log("Inserting new fair..." + JSON.stringify(newFair) + " : " +  token);
          return this.httpClient.post(UserService.url + 'admin/newfair',
                  newFair,
              {
                  headers: {
                      'Authorization' : 'Bearer ' + token
                  }
              }
          );

    }

    /**
     * Inserting packages of the fair
     */
    importPackages(newFair: Fair, packages: any): Observable<any>{
        let token = localStorage.getItem('idToken');
        console.log("Inserting new fair..." + JSON.stringify(newFair) + " : " +  token);

        return this.httpClient.post(
            UserService.url + 'admin/newpackages',
            packages,
            {
                params: {
                    fair_id: newFair.id + ""
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        )

    }



}
