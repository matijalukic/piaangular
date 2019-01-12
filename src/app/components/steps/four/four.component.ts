import { Component, OnInit } from '@angular/core';
import {StepComponent} from '../step.component';

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.css']
})
export class FourComponent implements OnInit, StepComponent {

  constructor() { }

  ngOnInit() {
  }

}
