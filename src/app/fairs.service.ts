import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
