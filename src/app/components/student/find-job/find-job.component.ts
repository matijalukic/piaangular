import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Job} from '../../../models/job';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {

    searchFormGroup: FormGroup;
    errorMessage: string;
    contentMessage: string;

    showingJobs: Array<Job>;

    constructor(
        private fb: FormBuilder,
        private studentService: StudentService
    ) { }

    ngOnInit() {
        this.searchFormGroup = this.fb.group({
            name: [''],
            practice: [0],
            job: [0],
        });

        // find all jobs
        this.studentService.findJob(this.f.name.value, ['practice', 'job'])
            .subscribe((succ) => {
                this.showingJobs = succ as Array<Job>;

                if(this.showingJobs.length == 0)
                    this.contentMessage = 'There is no results!';
            },(err) => {
                console.log(err);
                this.errorMessage = err.error.errorMessage;
            });
    }

    get f() {
        return this.searchFormGroup.controls;
    }


    search(){

        if(this.searchFormGroup.valid){
            let types = [];
            // turn to array
            if(this.f.practice.value) types.push('practice');
            if(this.f.job.value) types.push('job');

            // get jobs
            this.studentService.findJob(this.f.name.value, types)
                .subscribe((succ) => {
                   this.showingJobs = succ as Array<Job>;

                   if(this.showingJobs.length == 0)
                       this.contentMessage = 'There is no results!';
                },(err) => {
                    console.log(err);
                    this.errorMessage = err.error.errorMessage;
                });

        }
        else{
            this.errorMessage = 'Search fields are invalid!';

        }
    }

}
