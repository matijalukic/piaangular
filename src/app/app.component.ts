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

    constructor(private userService: UserService) {
        this.userService.getUser.subscribe((loggedUser: User) => {
            this.loggedUser = loggedUser;

            // if the user is logged check if is admin
            if(this.loggedUser) {
                userService.isAdmin().then(
                    (admin) => {
                        this.isAdmin = true;
                    },
                    (reject) => {
                        this.isAdmin = false;
                    }
                );
            }
        });


    }

    logOut() {
        this.userService.logOut();
        this.userService.getUser.next(null);
    }

}
