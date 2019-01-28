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


    constructor(
        private fairsService: FairsService

    ) { }


    ngOnInit() {

        // load fair
        this.fairsService.lastFair()
            .subscribe(
                (succ) => {
                    this.showingFair = succ as Fair;
                },
                (err) => {
                    this.errorMessage = 'The server is not loading!';
                }
            );
    }



}
