import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
      private httpClient: HttpClient
  ) { }

  findCompanies(name: string, city: string, minEmployees: number, maxEmployees: number, agency :string) : Observable<any>{
      const searchParams = new HttpParams()
                            .set('name', name)
                            .set('city', city)
          .set('min_employees', String(minEmployees))
          .set('max_employees', String(maxEmployees))
          .set('agency', agency);
      return this.httpClient.get(`${UserService.url}student/findcompany`, {
          params: searchParams,
          headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('idToken')
          })
      })
  }


    findJob(name: string, type: Array<string>) : Observable<any>{
        const searchParams = new HttpParams()
            .set('name', name)
            .set('type', type.join(','));
        return this.httpClient.get(`${UserService.url}student/findjob`, {
            params: searchParams,
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('idToken')
            })
        })
    }


    applyForJob(studentId: number, jobId: number, cover_letter: string, pdf: File) : Observable<any>{
        const httpParams = new HttpParams().set('job_id', String(jobId)).set('cover_letter', cover_letter).set('student_id', String(studentId));


        return this.httpClient.post(`${UserService.url}student/job/apply`, pdf,
            {
                params: httpParams,
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
                })
            });
    }

    // find application
    findApplication(studentId: number, jobId: number) : Observable<any>{
        const httpParams = new HttpParams().set('job_id', String(jobId)).set('student_id', String(studentId));

        return this.httpClient.get(`${UserService.url}student/findapplication`,
            {
                params: httpParams,
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
                })
            });
    }

    myApplications() : Observable<any> {
        return this.httpClient.get(`${UserService.url}student/myapplications`,
            {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
                })
            });
    }


    rateApplication(id: number, rate: number) : Observable<any> {
      return this.httpClient.get(`${UserService.url}student/application/rate`, {
          params : {
              id: String(id),
              rate: String(rate)
          },
          headers : {
              'Authorization' : 'Bearer ' + localStorage.getItem('idToken')
          }
      })
    }

}
