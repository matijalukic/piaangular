import {Component, Input, OnInit} from '@angular/core';
import {Fair} from '../../../models/fair';
import {FairsService} from '../../../services/fairs.service';
import {Permit} from '../../../models/permit';
import {Observable, Subscription} from 'rxjs';

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
    @Input()
    entriesOfFair: Array<Permit>;

    constructor( private fairsService: FairsService) { }

    ngOnInit() {
        this.fairsService.fairs().subscribe((fairs) => {
            this.fairsList = fairs as Array<Fair>;
        })
    }


    private loadEntries(){
        this.fairsService.entriesOfFair(this.selectedFair).subscribe(
            (permits) => {
                this.entriesOfFair = permits as Array<Permit>;
            });
    }

    selectFair(newSelectedFair: Fair){
        this.selectedFair = newSelectedFair;
        this.loadEntries();
    }



    // allow company to participate
    allow(permit: Permit){
        this.fairsService.allowParticipate(permit)
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
