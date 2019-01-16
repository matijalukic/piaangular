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

	@Output()
        done = new EventEmitter();

	file: any;
	fileContent: string;
	successMessage: string;
	packages: any; // JSON parsend content of packages

	constructor() { }

	ngOnInit() {
		let savedPackages = localStorage.getItem('importingPackages');
        if(savedPackages){
            this.fileContent = savedPackages;
            this.packages = JSON.parse(savedPackages);
        }

		this.uploadPackagesControl = new FormControl();
		this.uploadPackagesControl.setValidators([Validators.required]);
	}

	onChange(event){
		this.file = event.target.files[0];

		const fileReader = new FileReader();

		fileReader.onload = (e) => {
			this.fileContent = fileReader.result as string;
			this.successMessage = 'The file has been imported!';

            this.packages = JSON.parse(this.fileContent);
			// send event to the new-fair component
			this.imported.emit(this.fileContent);

		}

		fileReader.readAsText(this.file);

	}


	nextStep(){
        this.done.emit();
	}

}
