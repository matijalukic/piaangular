import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OneComponent} from '../../../components/steps/one/one.component';
import {TwoComponent} from '../../../components/steps/two/two.component';
import {ThreeComponent} from '../../../components/steps/three/three.component';
import {FourComponent} from '../../../components/steps/four/four.component';
import {StepComponent} from '../../../components/steps/step.component';
import {Fair} from '../../../models/fair';
import { FairComponent } from 'src/app/fair/fair.component';
import {FairsService} from '../../../services/fairs.service';

@Component({
  selector: 'app-new-fair',
  templateUrl: './new-fair.component.html',
  styleUrls: ['./new-fair.component.css']
})
export class NewFairComponent implements OnInit {
	@Input()
    selectedComponent: any;

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

	// images that was uploaded
    images: Array<string>;

    // locations of the fair
    locations: Array<string>;

	@Input()
	showingNo: number;

	importingPackages: string;

	notifications = [];
	errors = [];

	@ViewChild("notificationsList")
        notificationsElement: ElementRef;

	constructor(
	    private fairService: FairsService
    ) {
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
            this.locations = JSON.parse(localStorage.getItem('locations')) as Array<string>;

			// insert import packages
            this.importingPackages = localStorage.getItem('importingPackages');
	
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
        this.images = imageNames;
        localStorage.setItem('fairimages', JSON.stringify(imageNames));
	}

	private clearNotifications(){
	    this.errors = [];
	    this.notifications = [];
    }

	async sendAll(event){
	    // json array images here
        this.newFair.images = localStorage.getItem('fairimages');
        let insertedFair;

        // inserts all fair
        try {
            // insert fair
            let insertingFairResponse = await this.fairService.insertNewFair(this.newFair, this.locations).toPromise();
            console.log(insertingFairResponse);

            this.clearNotifications();
            insertedFair = insertingFairResponse.newInsertedFair as Fair;
            // push success message
            this.notifications.push(insertingFairResponse.successMessage);
            this.notificationsElement.nativeElement.scrollIntoView({behavior: 'smooth'});

            let packagesObject = JSON.parse(this.importingPackages);

            this.fairService.importPackages(insertedFair, packagesObject)
                .subscribe(
                    (res) => {
                        // delete all
                        this.importingPackages = "";
                        this.newFair = null;

                        // remove from local storage
                        localStorage.removeItem('newfair');
                        localStorage.removeItem('importingPackages');
                        localStorage.removeItem('fairimages');

                        // notify
                        this.notifications.push(res.successMessage);
                    },
                    (errResponse) => {

                        this.errors.push(errResponse.error.errorMessage);
                    }
                );

        }
        catch (e) {
            this.clearNotifications();

            if(e.errors){
                e.errors.forEach((errObj) => {
                    this.errors.push(errObj.msg);
                })
            }
            this.errors.push(e.error.errorMessage);
            this.notificationsElement.nativeElement.scrollIntoView();
            this.notificationsElement.nativeElement.scrollIntoView({behavior: 'smooth'});
        }

    }

    acceptLocations(locations: Array<string>){
	    this.locations = locations;
        localStorage.setItem('locations', JSON.stringify(this.locations));
    }

    importedFairs(data: string){
        let rawData = JSON.parse(data);

        let fairs = rawData.Fairs;

        if(fairs.length > 0) {
            this.newFair.name = fairs[0].Fair;
            this.newFair.start = new Date( fairs[0].StartDate + " " + fairs[0].StartTime).toISOString().slice(0,16);
            this.newFair.end = new Date(fairs[0].EndDate + " " + fairs[0].EndTime).toISOString().slice(0,16);
            this.newFair.place = fairs[0].Place;
            this.newFair.about = fairs[0].About;

            localStorage.setItem('newfair', JSON.stringify(this.newFair));
        }

        let locations = rawData.Locations;

        if(locations) {
            for (let location of locations) {
                if (location.Place == this.newFair.place) {
                    for (let loc of location.Location) {
                        if (!this.locations) this.locations = [];
                        this.locations.push(loc.Name)
                    }
                }
            }
            // save locations
            localStorage.setItem('locations', JSON.stringify(this.locations));
        }

    }


}
