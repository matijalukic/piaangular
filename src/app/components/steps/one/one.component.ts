import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {StepComponent} from '../step.component';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Fair} from '../../../models/fair';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit, StepComponent {
	newFairForm: FormGroup;
	errors: string[];
	fileContent: string;
    successMessage: string;


	@Output()
	submited = new EventEmitter<Fair>();

	@Output()
    locationsSent = new EventEmitter<Array<string>>();

	@Output()
    imported = new EventEmitter<string>();

	@Input()
	newFair: Fair;

    @Input()
    locations: Array<string>;

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
            console.log('Form invalid!');
            return;
        }

        // Emit that this is submited
        this.submited.emit(this.newFair);
        this.locationsSent.emit(this.locations);
    }

    updateLocations(locations: Array<string>){
	    this.locations = locations;
        this.locationsSent.emit(this.locations);
    }

    file: any;

    importJson(event){
        this.file = event.target.files[0];

        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            this.fileContent = fileReader.result as string;
            this.successMessage = 'The file has been imported!';

            // send event to the new-fair component
            this.imported.emit(this.fileContent);
        }

        fileReader.readAsText(this.file);
    }



}
