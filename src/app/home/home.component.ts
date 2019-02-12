import { Component, OnInit } from '@angular/core';
import {Fair} from '../models/fair';
import {FairsService} from '../services/fairs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    errorMessage: string;
    showingFair = {} as Fair;
    stillGoing = false;
    images: Array<string>;

    constructor(
        private fairsService: FairsService

    ) {
        // load fair
        this.fairsService.lastFair()
            .subscribe(
                (succ) => {
                    this.showingFair = succ as Fair;
                    try {
                        this.images = JSON.parse(succ.images);
                    }
                    catch (e) {}
                },
                (err) => {
                    this.errorMessage = 'The server is not loading!';
                }
            );

    }


    ngOnInit() {


    }



}
