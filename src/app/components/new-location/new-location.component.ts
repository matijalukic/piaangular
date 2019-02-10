import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Fair} from '../../models/fair';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})
export class NewLocationComponent implements OnInit {
    @Input()
    fair: Fair;
    locationNameControl: FormControl;

    @Input()
    locations: Array<string>;

    @Output()
    onAdded = new EventEmitter<Array<string>>();

    @Output()
    onNewLocation = new EventEmitter<string>();

    constructor() {
        this.locationNameControl = new FormControl('');
        this.locationNameControl.setValidators(Validators.required);
    }

    ngOnInit() {
    }


    // add location
    addLocation(){
        if(this.locationNameControl.valid){
            if(!this.locations) this.locations = [];
            this.locations.push(this.locationNameControl.value);
            this.onNewLocation.emit(this.locationNameControl.value); // push event emmiter for new location
            this.locationNameControl.reset();
            this.onAdded.emit(this.locations);
        }
    }


    clearLocations(){
        this.locations = [];
        this.onAdded.emit(this.locations);
    }

}
