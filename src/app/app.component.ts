import {Component, Input} from '@angular/core';
import {User} from './models/user';
import {UserService} from './services/user.service';
import {log} from 'util';

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

    constructor(private userService: UserService) {
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

    logOut() {
        localStorage.removeItem('idToken');
        this.userService.logOut();
        this.userService.getUser.next(null);
    }

}
