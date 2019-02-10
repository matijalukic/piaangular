import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ObservableLike} from 'rxjs';
import {Fair} from '../models/fair';
import {UserService} from './user.service';
import {Permit} from '../models/permit';
import {Company} from '../models/company';
import {User} from '../models/user';



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
        return this.httpClient.get(`${UserService.url}admin/fairs`, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            })
        });
    }

    companyFairs(companyId: number = null): Observable<any> {
        // set here
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
     * @param locations: Array of locations
     */
    insertNewFair(newFair: Fair, locations: Array<string>): Observable<any>{
          let token = localStorage.getItem('idToken');
          console.log("Inserting new fair..." + JSON.stringify(newFair) + " : " +  token);
          return this.httpClient.post(UserService.url + 'admin/newfair',
              {
                  fair: newFair,
                  locations: locations
              },
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
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                'fair_id': "" + selectedFair.id
            }
        });
    }

    /**
     * Allow the permit(participation of the company
     */
    allowParticipate(permit: Permit, location_id: number): Observable<any>{
        return this.httpClient.get(UserService.url + 'admin/allowpermit', {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                id: "" + permit.id,
                location_id: String(location_id)
            }
        })
    }

    forbidParticipate(permit: Permit): Observable<any>{
        return this.httpClient.get(UserService.url + 'admin/forbidpermit', {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                id: "" + permit.id
            }
        })
    }

    insertLocation(name: string, fairId: number): Observable<any>{
        return this.httpClient.get(`${UserService.url}admin/fair/location/insert`, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                fair_id: String(fairId),
                name: name
            }
        })
    }

    // cancel particiaption
    cancelParticipate(permit: Permit): Observable<any>{
        return this.httpClient.get(`${UserService.url}company/cancel/participation`, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: new HttpParams()
                .set('id', '' + permit.id),
        });
    }

    newPermit(packageID: number, additionals: Array<number>, fairID: number, company: Company): Observable<any> {
        return this.httpClient.post(`${UserService.url}company/newpermit`, {
            'fair_id': "" + fairID,
            'package_id': "" + packageID,
            'additionals_id': additionals,
            'company_id': "" + company.id
        }, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            })
        });
    }

    // find permits of the company
    findPermits(company: Company): Observable<any>{

        return this.httpClient.get(`${UserService.url}company/findpermit`, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                'company_id': "" + company.id
            }
        });
    }

    // returns a Permit with the package and additionals set
    findPermitById(id: number): Observable<any> {

        return this.httpClient.get(`${UserService.url}company/permit`, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            }),
            params: {
                'id': "" + id
            }
        })
    }

    editFair(editingFair: Fair): Observable<any>{
        return this.httpClient.post(`${UserService.url}admin/fair/edit`, editingFair, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            })
        });
    }




}
