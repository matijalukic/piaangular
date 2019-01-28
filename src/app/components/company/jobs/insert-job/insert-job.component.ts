import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../../../../services/job.service';
import {Job} from '../../../../models/job';
import {Company} from '../../../../models/company';
import {UserService} from '../../../../services/user.service';
import {errorObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-insert-job',
  templateUrl: './insert-job.component.html',
  styleUrls: ['./insert-job.component.css']
})
export class InsertJobComponent implements OnInit {

    insertingJob: Job;
    startingDate: string;
    endingDate: string;

    loggedCompany: Company;
    insertJobForm: FormGroup;
    errorMessage: string;
    successMessage: string;
    jobs: Array<Job>;


    constructor(
        private fb: FormBuilder,
        private jobService: JobService,
        private userService: UserService
    ) {
        this.insertingJob = {} as Job;
    }

    private updateJobs(){
        // load jobs
        this.jobService.companyJobs(this.loggedCompany.id)
            .subscribe((res) => {
                this.jobs = res as Array<Job>;
            });
    }

    ngOnInit() {
        this.insertJobForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            type: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required]
        });

        // load company
        this.userService.isCompany().subscribe(
            (succ) => {
                this.loggedCompany = succ as Company;
                this.insertingJob.company_id = this.loggedCompany.id;

                this.updateJobs();
            }
        );
    }

    get f(){
        return this.insertJobForm.controls;
    }

    newJob(){
        this.insertingJob.company_id = this.loggedCompany.id;

        if(this.insertJobForm.valid) {

            this.jobService.insertJob(this.insertingJob)
                .subscribe((response) => {
                        this.successMessage = response.successMessage;
                     if(response.newJob)
                        // add job to the list
                        this.jobs.push(this.insertingJob);
                },
                (err) => {
                    console.log(err);
                    this.errorMessage = err.error.errorMessage;
                });
        }
        else{
            if(!this.f.name.valid) this.errorMessage = "Name is not valid!";
            if(!this.f.description.valid) this.errorMessage = "Description is not valid!";
            if(!this.f.type.valid) this.errorMessage = "Type is not valid!";
            if(!this.f.start.valid) this.errorMessage = "Start is not valid!";
            if(!this.f.end.valid) this.errorMessage = "End is not valid!";
        }

    }


    clearJob(){
        this.insertingJob = {} as Job;

        this.startingDate = "";
        this.endingDate = "";
    }

    private  convertUTCDateToLocalDate(date) {
        let newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

        let offset = date.getTimezoneOffset() / 60;
        let hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    // pick job for editing
    pickJob(job: Job){
        this.insertingJob = job;
        console.log(job);

        let newStart = new Date(job.start);
        let newEnd = new Date(job.end);

        newStart = this.convertUTCDateToLocalDate(newStart);
        newEnd = this.convertUTCDateToLocalDate(newEnd);

        // date fixes
        this.startingDate = newStart.toISOString().slice(0,16);
        this.endingDate = newEnd.toISOString().slice(0,16);
    }

    setNewStart(newStart: string){
        this.insertingJob.start = newStart;
    }

    setNewEnd(newEnd: string){
        this.insertingJob.end = newEnd;
    }

    // on job removed
    removed(removingJob: Job){
        // receiving signal from removed
        this.jobService.removeJob(removingJob).subscribe((succ)=> {
                // filter out removed job
                this.jobs = this.jobs.filter((j, i) => {
                    return j.id != removingJob.id;
                });
                this.clearJob();
                this.successMessage = succ.successMessage;
        },
            (err) => {
                this.errorMessage = err.error.errorMessage;
            });

    }
}
