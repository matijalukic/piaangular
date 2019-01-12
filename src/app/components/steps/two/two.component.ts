import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StepComponent} from '../step.component';
import { Fair } from 'src/app/models/fair';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit,StepComponent {
  @Input()
  editFair: Fair;

  @Output()
  submited = new EventEmitter<Fair>();

  @Output()
  fileAdded = new EventEmitter<Array<string>>();

  editFairForm: FormGroup;

  fileNames = [];


  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.editFairForm = this.formBuilder.group({
      startCV: ['', []],
      endCV: ['', []],
      startParticipate: ['', []],
      endParticipate: ['', []],
      images: ['', []],
    });
    
  }

  get f(){
    return this.editFairForm.controls;
  }

  onSubmit(){
    if(this.editFairForm.invalid){
      return;
    }

    this.submited.emit(this.editFair);
  }

  receiveFile(fileName: string){
        this.fileNames.push(fileName);
        this.fileAdded.emit(this.fileNames);
  }

}
