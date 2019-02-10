import {Component, Input} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';
import {log} from 'util';
import {Form, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Input() loggedUser: User;
    title = 'jobfair';
    isAdmin: boolean;
    isCompany = false;
    isStudent = false;

    nameControl: FormControl;
    agencyControl: FormControl;
    cityControl: FormControl;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.nameControl = new FormControl("", Validators.required);
        this.agencyControl = new FormControl("", Validators.required);
        this.cityControl = new FormControl("", Validators.required);

        this.userService.getUser.subscribe((loggedUser: User) => {
            this.loggedUser = loggedUser;

            // if the user is logged check if is admin
            if(this.loggedUser) {
                // check if it is admin
                userService.isAdmin().then(
                    (admin) => {
                        this.isAdmin = true;
                    },
                    (reject) => {
                        this.isAdmin = false;
                    }
                );

                // set the company
                this.userService.isCompany().subscribe(
                    (company) => {
                        if(company)
                            this.isCompany = true;
                    },
                )

                // set if it is student
                this.userService.isStudent()
                    .subscribe((res) => {
                        if(res) this.isStudent = true;
                    });
            }
        });

    }

    searchCompanies(){
        this.router.navigate(['companies'], {queryParams: {name: this.nameControl.value, agency: this.agencyControl.value, city: this.cityControl.value}
        });
    }

    logOut() {
        localStorage.removeItem('idToken');
        this.userService.logOut();
        this.userService.getUser.next(null);
    }

}
