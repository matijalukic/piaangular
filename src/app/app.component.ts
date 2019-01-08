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

    constructor(private userService: UserService) {
        this.userService.getUser.subscribe((loggedUser: User) => {
            this.loggedUser = loggedUser;
        });
    }

    logOut() {
        this.userService.logOut();
        this.userService.getUser.next(null);
    }

}
