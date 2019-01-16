import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StepComponent} from '../step.component';
import { Fair } from 'src/app/models/fair';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {UserService} from '../../../services/user.service';

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

    displayingImage: string;
    displayingImageIndex: number;


    private persistFileNames(){
        localStorage.setItem('fairimages', JSON.stringify(this.fileNames))
    }

    constructor(private formBuilder: FormBuilder,
                private userService: UserService) {
        this.fileNames = JSON.parse(localStorage.getItem('fairimages')) as Array<string>;
        if(this.fileNames && this.fileNames.length > 0){
            this.displayImage(this.fileNames[0]);
            this.displayingImageIndex = 0;
        }
    }

    ngOnInit() {
        // load editing fair from storage
        this.editFair = JSON.parse(localStorage.getItem('newfair')) as Fair;
        if(!this.editFair)
            this.editFair = {} as Fair;

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
        if(!this.fileNames) // lazy init
            this.fileNames = [];

        this.fileNames.push(fileName);
        this.fileAdded.emit(this.fileNames);
    }


    private createImageFromBlob(image: Blob){
        let reader = new FileReader();

        reader.onloadend = () => {
            this.displayingImage = reader.result as string;
        };

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    displayImage(name: string){
        this.displayingImageIndex = this.fileNames.indexOf(name);
        // console.log(this.displayingImageIndex + "image that is displaying");
        this.userService.getImage(name)
            .subscribe(
            (image: Blob) => {
                this.createImageFromBlob(image);
            },
            (err) =>
            {
                console.log(err)
            });
    }



    removeFile(index: number){

        console.log('Removing file ' + index);
        // remove from file name
        this.fileNames = this.fileNames.filter((val, ind) => {
          return ind != index;
        });

        // save file names
        this.persistFileNames();
    }

}
