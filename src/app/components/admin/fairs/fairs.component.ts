import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Fair} from '../../../models/fair';
import {FairsService} from '../../../services/fairs.service';
import {Permit} from '../../../models/permit';
import {Location} from '../../../models/location';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.css']
})
export class FairsComponent implements OnInit {

    errorMessage: string;
    successMessage: string;
    fairsList: Array<Fair>;
    // selected for viewing entries
    selectedFair: Fair;

    // selected for editing and adding locations
    editingFair: Fair;

    locations: Array<Location>;
    locationsNames: Array<string>;

    @Input()
    entriesOfFair: Array<Permit>;

    locationControl: FormControl;

    // @ViewChild('newLocation')
    // newLocation: ElementRef;

    constructor( private fairsService: FairsService,
                 private fb: FormBuilder) {
        this.locationControl = new FormControl();
        this.locationControl.setValidators(Validators.required);
    }

    ngOnInit() {
        this.fairsService.fairs().subscribe((fairs) => {
            this.fairsList = fairs as Array<Fair>;
        })
    }


    private loadEntries(){
        this.fairsService.entriesOfFair(this.selectedFair).subscribe(
            (permits) => {
                this.entriesOfFair = permits as Array<Permit>;
                this.locations = this.selectedFair.locations;
            });
    }

    private loadSelectedLocations(){
        this.fairsService.entriesOfFair(this.editingFair).subscribe(
            (permits) => {
                this.entriesOfFair = permits as Array<Permit>;
                this.locations = this.editingFair.locations;
                this.locationsNames = this.locations.map((loc) => { return loc.name });
            });
    }

    selectFair(newSelectedFair: Fair){
        this.editingFair = null;
        this.selectedFair = newSelectedFair;
        this.loadEntries();
    }

    // allow company to participate
    allow(permit: Permit){
        this.fairsService.allowParticipate(permit, this.locationControl.value)
            .subscribe(
                (permit) => {
                    this.errorMessage = null;
                    this.successMessage = permit.successMessage;

                    this.loadEntries();
                },
                (errResponse) => {
                    this.successMessage = null;
                    this.errorMessage = errResponse.error.errorMessage;
                }
            );
    }

    // forbid company
    forbid(permit: Permit){
        this.fairsService.forbidParticipate(permit)
            .subscribe(
                (permit) => {
                    this.errorMessage = null;
                    this.successMessage = permit.successMessage;

                    this.loadEntries();
                },
                (errResponse) => {
                    this.successMessage = null;
                    this.errorMessage = errResponse.error.errorMessage;
                }
            );
    }



    // select editing fair
    pickEditFair(editFair: Fair){
        this.selectedFair = null;
        this.editingFair = editFair;

        this.loadSelectedLocations();
    }

    addLocation(name: string){
        this.fairsService.insertLocation(name, this.editingFair.id).subscribe(
            (succ) => {
                this.errorMessage = null;
                this.successMessage = succ.successMessage;

                if(this.editingFair)
                    this.editingFair.locations.push(succ.location);
            },
            (errorResponse) => {
                this.successMessage = null;
                this.errorMessage = errorResponse.error.errorMessage;
                this.loadSelectedLocations();
            }
        );
    }

    updateLocations(newLocations: Array<string>){
        // this.loadSelectedLocations();
        this.locationsNames = newLocations;
    }


    // run save for editing fair
    editFair(){
        this.fairsService.editFair(this.editingFair).subscribe(
            (response) => {
                this.errorMessage = null;
                this.successMessage = response.successMessage;
            },
            (errorResponse) => {
                this.successMessage = null;
                this.errorMessage = errorResponse.error.errorMessage;
            }
        )
    }




}
