import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application} from '../../../models/application';
import {CompanyService} from '../../../services/company.service';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-accept-application',
  templateUrl: './accept-application.component.html',
  styleUrls: ['./accept-application.component.css']
})
export class AcceptApplicationComponent implements OnInit {
    @Input()
    application: Application;

    user: User;

    @Output()
    errors = new EventEmitter();

    successMessage: string;



    constructor(
        private companyService: CompanyService,
        private userService: UserService
    ) { }

    ngOnInit() {

        this.userService.getUserById(this.application.student_id)
            .subscribe((succ) => {
                this.user = succ as User;
            });

    }

    accept(){
        this.companyService.acceptApplication(this.application.id)
            .subscribe(
                (succ) => {
                    this.application = succ.application as Application;
                    this.successMessage = succ.successMessage;
                },
                (err) => {
                    this.errors.emit(err.error.errorMessage);
                }
            );
    }

}
