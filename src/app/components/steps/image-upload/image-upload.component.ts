import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File;
  errorMsg: string;
  successMsg: string;
  uploadControl: FormControl;

  @Output()
  fileSent = new EventEmitter<string>();

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.uploadControl = new FormControl();
    this.uploadControl.setValidators([Validators.required]);
  }


  addFile(event){
      this.selectedFile  = event.target.files[0];

      this.userService.uploadFile(this.selectedFile)
          .subscribe((data) => {
              if(data) {
                  this.successMsg = data.successMessage;
                  this.errorMsg = '';

                  this.fileSent.emit(data.imageName);
              }
              else {
                  console.log(data);
                  this.errorMsg = data.errorMessage;
              }

              this.uploadControl.reset();
          },(errorResponse) => {
              this.uploadControl.reset();
              this.errorMsg = errorResponse.error.errorMessage;
              this.successMsg = '';
          });
  }
}
