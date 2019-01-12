import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OneComponent} from '../../../components/steps/one/one.component';
import {TwoComponent} from '../../../components/steps/two/two.component';
import {ThreeComponent} from '../../../components/steps/three/three.component';
import {FourComponent} from '../../../components/steps/four/four.component';
import {StepComponent} from '../../../components/steps/step.component';
import {Fair} from '../../../models/fair';
import { FairComponent } from 'src/app/fair/fair.component';

@Component({
  selector: 'app-new-fair',
  templateUrl: './new-fair.component.html',
  styleUrls: ['./new-fair.component.css']
})
export class NewFairComponent implements OnInit {
	@Input() selectedComponent: any;

	newFair: Fair;

	@ViewChild(OneComponent)
	firstComponent: OneComponent;

	@ViewChild(TwoComponent)
	secondComponent: TwoComponent;

	@ViewChild(ThreeComponent)
	thirdComponent: ThreeComponent;

	@ViewChild(FourComponent)
	fourComponent: FourComponent;

	// showing
	listComponents: StepComponent[];
	showingComponent: StepComponent;

	@Input()
	showingNo: number;

	importingPackages: string;

	constructor() {
		this.listComponents = [
		this.firstComponent,
		this.secondComponent,
		this.thirdComponent,
		this.fourComponent
		];
		this.showingNo = 0;

		try{
			// init the fair model
			this.newFair = JSON.parse(localStorage.getItem('newfair')) as Fair;
	
	
		}
		catch(err){
			this.newFair = {} as Fair;
		}
	}

	ngOnInit() {
		this.showingComponent = this.firstComponent;
	}


	showComponent(no: number) {
		if (no >= this.listComponents.length || no < 0) {
			no = 0;
		}
		this.showingNo = no;
		this.showingComponent = this.listComponents[no];
	}

	/**
	 * Next step
	 */
	nextStep(fair: Fair){
	  if(this.showingNo == 3)
	  {
		this.submitAll();
	  }
	  this.newFair = fair;
	  
	  // store the new fair
	  localStorage.setItem('newfair', JSON.stringify(this.newFair));
	  this.showingNo++;
	}


	importPackages(fileData){
		this.importingPackages = fileData;	
		localStorage.setItem('importingPackages', fileData);
	}

	/**
	 * Submit all data
	 */
	private submitAll(){

	}

    /**
	 * Save files to the local storaga
     */
	saveFiles(imageNames : Array<string>){
		localStorage.setItem('fairimages', JSON.stringify(imageNames));
	}


}
