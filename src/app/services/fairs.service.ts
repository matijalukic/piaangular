import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ObservableLike} from 'rxjs';
import {Fair} from '../models/fair';
import {UserService} from './user.service';
import {Permit} from '../models/permit';
import {Company} from '../models/company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
  })
};

const httpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
});

@Injectable({
  providedIn: 'root'
})
export class FairsService {

    constructor(public httpClient: HttpClient) { }

    public static getToken(): string{
      return localStorage.getItem('idToken');
    }


    lastFair() : Observable<any> {
        return this.httpClient.get(`${UserService.url}latestfair`);
    }

    findFair(id: number) : Observable<any> {
        return this.httpClient.get(`${UserService.url}findfair/${id}`);
    }


    fairs(): Observable<any> {
        // set here
        httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());

        return this.httpClient.get(`${UserService.url}admin/fairs`, httpOptions);
    }

    companyFairs(companyId: number = null): Observable<any> {
        // set here
        // httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());
        let options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                company_id: String(companyId)
            }
        }
        return this.httpClient.get(`${UserService.url}company/fairs`, options);
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


    /**
     * Getting the entries of the fair
     */
    entriesOfFair(selectedFair: Fair): Observable<any> {
        return this.httpClient.get('http://localhost:3000/admin/fair/permits', {
            headers: httpHeaders,
            params: {
                'fair_id': "" + selectedFair.id
            }
        });
    }

    /**
     * Allow the permit(participation of the company
     */
    allowParticipate(permit: Permit): Observable<any>{
        return this.httpClient.get(UserService.url + 'admin/allowpermit', {
            headers: httpHeaders,
            params: {
                id: "" + permit.id
            }
        })
    }

    forbidParticipate(permit: Permit): Observable<any>{
        return this.httpClient.get(UserService.url + 'admin/forbidpermit', {
            headers: httpHeaders,
            params: {
                id: "" + permit.id
            }
        })
    }

    // cancel particiaption
    cancelParticipate(permit: Permit): Observable<any>{
        httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());
        return this.httpClient.get(`${UserService.url}company/cancel/participation`, {
            headers: httpHeaders,
            params: new HttpParams()
                .set('id', '' + permit.id),
        });
    }

    newPermit(packageID: number, additionals: Array<number>, fairID: number, company: Company): Observable<any> {
        httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());
        return this.httpClient.post(`${UserService.url}company/newpermit`, {
            'fair_id': "" + fairID,
            'package_id': "" + packageID,
            'additionals_id': additionals,
            'company_id': "" + company.id
        }, {
            headers: httpHeaders
        });
    }

    // find permits of the company
    findPermits(company: Company): Observable<any>{
        httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());

        return this.httpClient.get(`${UserService.url}company/findpermit`, {
            headers: httpHeaders,
            params: {
                'company_id': "" + company.id
            }
        });
    }

    // returns a Permit with the package and additionals set
    findPermitById(id: number): Observable<any> {
        httpHeaders.set('Authorization', 'Bearer ' + FairsService.getToken());

        return this.httpClient.get(`${UserService.url}company/permit`, {
            headers: httpHeaders,
            params: {
                'id': "" + id
            }
        })
    }




}
