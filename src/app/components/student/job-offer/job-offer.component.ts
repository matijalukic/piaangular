import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../models/job';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

    @Input()
    job: Job;

    isClosed = false;
    constructor() {
    }

    ngOnInit() {
        let jobEndDate = new Date();
        if(this.job)
            jobEndDate = new Date(this.job.end);

        if(jobEndDate < new Date())
            this.isClosed = true;
    }

}
