import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application} from '../../../models/application';
import {FormControl, Validators} from '@angular/forms';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-rate-application',
  templateUrl: './rate-application.component.html',
  styleUrls: ['./rate-application.component.css']
})
export class RateApplicationComponent implements OnInit {

    @Input()
    application: Application;

    rateControl: FormControl;

    @Output()
    errors = new EventEmitter();

    constructor(
        private studentService: StudentService
    ) {
        this.rateControl = new FormControl('1');
        this.rateControl.setValidators([Validators.min(1), Validators.max(5)]);

    }

    ngOnInit() {

    }

    rate(){
        if(this.rateControl.valid){
            this.studentService.rateApplication(this.application.id, this.rateControl.value)
                .subscribe(
                    (res) => {
                        this.application = res.application as Application;
                    },
                    (err) =>{
                        this.errors.emit(err.error.errorMessage);
                    }
                )
        }
        else
            this.errors.emit('The rate is not valid!');
    }

}
