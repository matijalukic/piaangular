import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../../models/job';
import {JobService} from '../../../services/job.service';
import {UserService} from '../../../services/user.service';
import {Student} from '../../../models/student';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../../services/student.service';
import {Application} from '../../../models/application';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrls: ['./single-job.component.css']
})
export class SingleJobComponent implements OnInit {

    job: Job;
    isStudent = false;
    loggedStudent: Student;
    id: number;
    errorMessage: string;
    successMessage: string;

    selectedFile: File;
    coverLetterControl: FormControl;

    studentsApplication: Application;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jobService: JobService,
        private usersService: UserService,
        private studentService: StudentService
    ) {
      this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
      });

    }

    private loadApplication(){
        this.studentService.findApplication(this.loggedStudent.id, this.id)
            .subscribe((succ) => {
                if(succ)
                    this.studentsApplication = succ as Application;
                else
                    this.studentsApplication = null;
            });
    }

    ngOnInit() {
        this.jobService.getJob(this.id)
            .subscribe((resJob) => {
                this.job = resJob as Job;
            },
            (err) => {
                this.errorMessage = err.error.errorMessage;
            })

        // if the is student
        this.usersService.isStudent()
            .subscribe((res) => {
                this.loggedStudent = res as Student;
                this.isStudent = true;

                // if it is student
                this.loadApplication();

            }, (err) => console.log(err));

        this.coverLetterControl = new FormControl();

    }

    // update file
    uploadPdf(event){

        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }

    submit(){
        if(this.coverLetterControl.valid){
            this.studentService.applyForJob(this.loggedStudent.id, this.job.id, this.coverLetterControl.value, this.selectedFile)
                .subscribe(
                    (succ) => {
                        console.log(succ);
                        this.successMessage = succ.successMessage;
                    },
                    (err) => {
                        console.log(err);
                        this.errorMessage = err.error.errorMessage;
                    }
                );
        }
    }
}
