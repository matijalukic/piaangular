import { Injectable } from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {Observable, of, BehaviorSubject, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/user';
import { Router } from '@angular/router';
import {Student} from '../models/student';
import {Person} from '../models/person';
import {Company} from '../models/company';

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


    getUserById(id: number) : Observable<any>{
        return this.httpClient.get(`${UserService.url}user`, {
            params : {
                id: String(id)
            }
        });
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

		return this.httpClient.get( UserService.url + 'isadmin', { params: httpParams }).toPromise();
	}

	isCompany(): Observable<any>{
        let token = localStorage.getItem('idToken');
        const httpParams = new HttpParams().set('token', token);

        return this.httpClient.get(UserService.url + 'iscompany', {params: httpParams});
    }

    checkCompany() : Observable<boolean> {
        return this.isCompany()
            .pipe(
                map(
                    (res) =>
                    {
                        return true;
                    }
                )
            );
    }


    isStudent(): Observable<any>{
        let token = localStorage.getItem('idToken');
        const httpParams = new HttpParams().set('token', token);

        return this.httpClient.get(UserService.url + 'isstudent', {params: httpParams});
    }

    checkStudent(): Observable<boolean> {
        return this.isStudent().pipe(
            map(
                (student) => {
                    return true;
                }
            )
        );
    }

    // get logged in company
    getCompany(): Observable<any>{
        let token = localStorage.getItem('idToken');
        const httpParams = new HttpParams().set('token', token);

        return this.httpClient.get(UserService.url + 'company/get', {params: httpParams});
    }

	parseImportingPackages(): any{
        return JSON.parse(localStorage.getItem('importingPackages'));
    }

	logOut(){
		localStorage.removeItem('idToken');
		localStorage.removeItem('user');

		this.router.navigate(['/home']);		
	}

    /**
     * Register company or student
     * @param user
     * @param person
     * @param student
     * @param company
     */
	register(user: User, person: Person, student: Student, company: Company)
        :Observable<any>
    {
        return this.httpClient.post(`${UserService.url}register`,{
            user: user,
            person: person,
            student: student,
            company: company,
        });
    }


    countUsernames(username: string) : Observable<any> {
	    return this.httpClient.get(`${UserService.url}username`, {
	        params: {
	            username: username
            }
        });
    }

    countEmails(email: string) : Observable<any> {
	    return this.httpClient.get(`${UserService.url}emails`, {
	        params: {
	            email: email
            }
        });
    }

    changePassword(oldPassword: string, newPassword: string) : Observable<any>{
	    return this.httpClient.get(`${UserService.url}user/changepassword`, {
	        params: {
	            old_password: oldPassword,
                new_password: newPassword
            },
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('idToken')
            }
        });
    }

}
