import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '../models/company';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

    /**
     * find company by id
     */
    find(id: number) : Observable<any>{
        return this.httpClient.get(UserService.url + "company/find", {
            params: {
                id: id
            }
        });
    }
}
