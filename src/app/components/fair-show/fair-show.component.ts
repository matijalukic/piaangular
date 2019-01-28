import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FairsService} from '../../services/fairs.service';
import {Fair} from '../../models/fair';

@Component({
  selector: 'app-fair-show',
  templateUrl: './fair-show.component.html',
  styleUrls: ['./fair-show.component.css']
})
export class FairShowComponent implements OnInit {
    id: number;
    showingFair = {} as Fair;
    images: Array<string>;
    errorMessage: string;

    private loadFair(){
        console.log("Loading fair..." + this.id);

        // load fair
        this.fairsService.findFair(this.id)
            .subscribe(
                (succ) => {
                    console.log(succ);
                    this.showingFair = succ as Fair;

                    try{
                        this.images = JSON.parse(this.showingFair.images);
                        console.log(this.images);
                    }catch (e) {

                    }
                },
                (err) => {
                    console.log(err);
                    this.errorMessage = 'The server is not loading!';
                }
            );
    }


    constructor(
        private activatedRoute: ActivatedRoute,
        private fairsService: FairsService) {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.loadFair();

        });
    }


    ngOnInit() {
    }

}
