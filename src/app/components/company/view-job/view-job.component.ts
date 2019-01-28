import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../../models/job';
import {CompanyService} from '../../../services/company.service';
import {Application} from '../../../models/application';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
    id: number;
    job: Job;
    errorMessage: string;
    applicationsOfJob: Array<Application>;

    constructor(
        private companyService: CompanyService,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.params.subscribe(
            (params) => {
                this.id = params['id'];

                // load when the id is loaded
                this.loadJob();

            }
        )

    }

    private loadJob(){
        this.companyService.findJob(this.id)
            .subscribe((res) => {
                console.log(res);
                this.job = res.job as Job;
                this.applicationsOfJob = res.applications as Array<Application>;
            }, (err) => {
                this.errorMessage = err.error.errorMessage;
            });
    }


    ngOnInit() {
    }

    handleError(errorText: string){
        this.errorMessage = errorText;
    }

}
