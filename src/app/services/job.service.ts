import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Job} from '../models/job';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

const httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('idToken')
});


@Injectable({
  providedIn: 'root'
})
export class JobService {
    constructor(public httpClient: HttpClient) { }

    insertJob(newJob: Job) : Observable<any>{
        const httpParams = new HttpParams().set('company_id', String(newJob.company_id));

        return this.httpClient.post(`${UserService.url}company/newjob`, newJob, {
            params: httpParams,
            headers: httpHeaders
        });
    }


    companyJobs(companyId: number) : Observable<any> {
        const httpParams = new HttpParams().set('id', String(companyId));
        return this.httpClient.get(`${UserService.url}company/myjobs`, {
            params: httpParams,
            headers: httpHeaders
        });
    }


    removeJob(removingJob: Job): Observable<any> {
        const httpParams = new HttpParams().set('job_id', String(removingJob.id));
        return this.httpClient.get(`${UserService.url}company/job/remove`, {
            params: httpParams,
            headers: httpHeaders
        });
    }

    // get job
    getJob(id: number): Observable<any>{
        const httpParams = new HttpParams().set('id', String(id));
        return this.httpClient.get(`${UserService.url}find/job`, {
            params: httpParams,
            headers: httpHeaders
        })
    }



}
