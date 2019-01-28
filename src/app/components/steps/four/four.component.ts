import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StepComponent} from '../step.component';
import {Fair} from '../../../models/fair';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.css']
})
export class FourComponent implements OnInit, StepComponent {
    @Input()
        newFair: Fair;
    @Input()
        locations: Array<string>;

    @Output()
        submited = new EventEmitter();


    images : Array<string>;
    showingImageIndex: number;
    showingImage: string;
    packages: any;

    constructor(
        private userService: UserService
    ) {
        this.images = JSON.parse(localStorage.getItem('fairimages'));
        this.packages = this.userService.parseImportingPackages(); // get the packages

        // pick the first image to show
        if(this.images && this.images.length > 0){
            this.showingImageIndex = 0;
            this.userService.getImage(this.images[0])
                .subscribe(
                    (blob: Blob) => {
                        this.createImageFromBlob(blob);
                    }
                );
        }
    }

    ngOnInit() {

    }

    submitAll(){
        this.submited.emit();
    }


    private createImageFromBlob(image: Blob){
        let reader = new FileReader();

        reader.onloadend = () => {
            this.showingImage = reader.result as string;
        };

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    /**
     * Send request for new image
     *
     * @param name
     */
    showImage(name: string){
        // set new showing index
        this.showingImageIndex = this.images.indexOf(name);

        this.userService.getImage(name)
            .subscribe(
                (blob: Blob) => {
                    this.createImageFromBlob(blob);
                },
                (err) => {
                    console.log('Error with showing image ' + err);
                }
            );
    }
}
