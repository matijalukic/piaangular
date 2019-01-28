import { Component, OnInit } from '@angular/core';
import {Application} from '../../../models/application';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {

    myApplications: Array<Application>;
    errorMessage: string;

    constructor(
        private studentService: StudentService

    ) { }

    private loadApplications(){

        this.studentService.myApplications()
            .subscribe(
                (res) => {
                    this.myApplications = res as Array<Application>;
                }
            );
    }


    ngOnInit() {
        this.loadApplications();
    }


    handleError(error: string){
        this.errorMessage = error;
    }

}
