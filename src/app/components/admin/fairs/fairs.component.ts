import {Component, Input, OnInit} from '@angular/core';
import {Fair} from '../../../models/fair';
import {FairsService} from '../../../services/fairs.service';
import {Permit} from '../../../models/permit';
import {Location} from '../../../models/location';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.css']
})
export class FairsComponent implements OnInit {

    errorMessage: string;
    successMessage: string;
    fairsList: Array<Fair>;
    selectedFair: Fair;
    locations: Array<Location>;

    @Input()
    entriesOfFair: Array<Permit>;

    locationControl: FormControl;

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

    selectFair(newSelectedFair: Fair){
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
}
