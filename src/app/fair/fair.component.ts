import {Component, Input, OnInit} from '@angular/core';
import {Fair} from '../models/fair';

@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.css']
})
export class FairComponent implements OnInit {
  @Input() fair: Fair;

  constructor() { }

  ngOnInit() {
  }

}
