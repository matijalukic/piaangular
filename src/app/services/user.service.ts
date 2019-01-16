import { Injectable } from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Observable, of, BehaviorSubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    static url = 'http://localhost:3000/';
    private loggedUserSubject: BehaviorSubject<User>;
    private errorMessage: string;


    constructor(private httpClient: HttpClient,
                private router: Router) {
        this.loggedUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

    }

  // login request
  	login(username: string, password: string): Observable<any> {

		const httpParams = new HttpParams()
		.set('username', username)
		.set('password', password);

		return this.httpClient.post(UserService.url + 'login', {}, { params: httpParams })
			.pipe(map((response) => {
				if (response) {
					//console.log('user service set idToken and user');
					localStorage.setItem('idToken', response['token']);
					localStorage.setItem('user', JSON.stringify(response['user']));
					this.loggedUserSubject.next(response['user']);
				}
				return response;
			}));

	}

    // get logged User instance
    public get getUser(){
      return this.loggedUserSubject;
    }

	// if the user has local storage token
	isLogged(): boolean {
		if(!localStorage.getItem('user')){
			return false;
		}
		return true;
	}

	// upload files
	uploadFile(file: File): Observable<any>{
        let token = localStorage.getItem('idToken');

        // create form data
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.httpClient.post(UserService.url + 'admin/uploadimage', formData,
            {headers:  { 'Authorization' : 'Bearer ' + token} });
    }

    // get file from server
    getImage(name: string): Observable<Blob>{
        let token = localStorage.getItem('idToken');
        return this.httpClient.get(UserService.url + 'admin/image',
            {
                headers: {
                    'Authorization' : 'Bearer ' + token
                },
                params: {
                    name: name
                },
                responseType: 'blob'
            });
    }



	async isAdmin(): Promise<any>{
		let token = localStorage.getItem('idToken');
		const httpParams = new HttpParams().set('token', token);

		return this.httpClient.get( UserService.url + 'isadmin', { params: httpParams })
		.toPromise();
	}

	parseImportingPackages(): any{
        return JSON.parse(localStorage.getItem('importingPackages'));
    }

	logOut(){
		localStorage.removeItem('idToken');
		localStorage.removeItem('user');

		this.router.navigate(['/home']);		
	}
}
