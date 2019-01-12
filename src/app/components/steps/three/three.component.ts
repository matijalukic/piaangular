import { Component, OnInit, Output } from '@angular/core';
import {StepComponent} from '../step.component';
import { FormControl, Validators } from '@angular/forms';
import { EventEmitter} from '@angular/core';

@Component({
	selector: 'app-three',
	templateUrl: './three.component.html',
	styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit,StepComponent {

	uploadPackagesControl: FormControl;

	@Output()
	imported = new EventEmitter<string>();

	file: any;
	fileContent: string;
	successMessage: string;

	constructor() { }

	ngOnInit() {
		
		this.uploadPackagesControl = new FormControl();
		this.uploadPackagesControl.setValidators([Validators.required]);
	}

	onChange(event){
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


	importPackages(){
		if(this.uploadPackagesControl.invalid){
			return;
		}


		// this.imported.emit(this.fileContent);


	}

}
