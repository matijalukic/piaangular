import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '../models/company';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
        return this.httpClient.get(UserService.url + "find/company", {
            params: {
                id: "" + id
            }
        });
    }

    /**
     * Find the job by the id
     */
    findJob(id: number) : Observable<any>{
        return this.httpClient.get(`${UserService.url}company/job/view`, {
            params: { id: String(id) },
            headers: new HttpHeaders({
                'Authorization':  'Bearer ' + localStorage.getItem('idToken')
            })
        });
    }


    /**
     * Send request for accepting application
     * @param id
     */
    acceptApplication(id: number) : Observable<any>{
        return this.httpClient.get(`${UserService.url}company/job/application/accept`, {
            params: { id: String(id) },
            headers: new HttpHeaders({
                'Authorization':  'Bearer ' + localStorage.getItem('idToken')
            })
        });
    }


}
