import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {StepComponent} from '../step.component';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {Fair} from '../../../models/fair';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit, StepComponent {
	newFairForm: FormGroup;
	errors: string[];

	@Output()
	submited = new EventEmitter<Fair>();

	@Input()
	newFair: Fair;

	constructor(private formBuilder: FormBuilder) {
	}

	ngOnInit() {
	    if(this.newFair == null)
	        this.newFair = {} as Fair;
		this.newFairForm = this.formBuilder.group({
			name:   ['', Validators.required],
			place:  ['', [Validators.required]],
			about:  ['', [Validators.required]],
			start:  ['', [Validators.required]],
			end:    ['', [Validators.required]],
		});

	}

  get f() { return this.newFairForm.controls; }

  	onSubmit(){
		if(this.newFairForm.invalid){
			return;
		}

		// Emit that this is submited
		this.submited.emit(this.newFair);
  	}

}
