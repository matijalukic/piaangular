import {Component, Input, OnInit} from '@angular/core';
import {Fair} from '../../models/fair';
import {FairsService} from '../../services/fairs.service';

@Component({
  selector: 'app-single-fair',
  templateUrl: './single-fair.component.html',
  styleUrls: ['./single-fair.component.css']
})
export class SingleFairComponent implements OnInit {
    @Input()
    showingFair = {} as Fair;
    stillGoing = false;

    // images of the carousel
    @Input()
    images: Array<string>;
    serverUrlImages = 'http://localhost:3000/image/';


    errorMessage: string;

    constructor(
        private fairsService: FairsService
    ) {

    }

    private setStillGoing(){
        let now = new Date();
        let start = new Date(this.showingFair.start);
        let end = new Date(this.showingFair.end);
        this.stillGoing =  start < now  && end > now;
    }

    ngOnInit() {
        this.fairsService.lastFair()
            .subscribe(
                (succ) => {
                    // this.showingFair = succ as Fair;
                    this.setStillGoing();
                },
                (err) => {
                    this.errorMessage = 'The server is not loading!';
                    this.setStillGoing();
                }
            );

    }

    // find package name of the company by package_id
    private packageName(packId: number){
        if(this.showingFair.packages){
            let packages = this.showingFair.packages.filter((pack) =>  pack.id == packId);
            if(packages.length == 0) return null;
            return packages.shift().title;
        }
        return null;
    }

    private locationName(locationId: number){
        if(this.showingFair.locations){
            let locs = this.showingFair.locations.filter((loc) =>  loc.id == locationId);
            if(locs.length == 0) return null;
            return locs.shift().name;
        }
        return null;
    }

}
