import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../../../models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
    @Input()
    selectedJob: Job;

    @Input()
    job: Job;

    @Output()
    removed = new EventEmitter<Job>();

    constructor() { }

    ngOnInit() {

    }

    removeJob(){
        // emit the job you want to remove
        this.removed.emit(this.job);
    }

}
