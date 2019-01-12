import { Component, OnInit } from '@angular/core';
import { FairsService} from '../../services/fairs.service';
import {Fair} from '../../models/fair';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.css']
})
export class FairsComponent implements OnInit {
  fairs: Array<Fair>;
  errorMessage: string;
  constructor(private fairsService: FairsService) { }

  ngOnInit() {
    this.loadFairs();
  }

  private loadFairs() {
    this.fairsService.fairs().subscribe(
      (fairs: Array<Fair>) => {
        this.fairs = fairs;
      },
      (errormsg) => {
        this.errorMessage = errormsg.error.error;
      }
    );

    if (this.errorMessage) {
      console.log(this.fairs);
    }
  }

}
