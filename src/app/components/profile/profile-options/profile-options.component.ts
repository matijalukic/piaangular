import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {
    errorMessage: string;
    successMessage: string;
    changePasswordGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.changePasswordGroup = this.fb.group({
           old_password: ['', Validators.required],
           new_password: ['', [Validators.required, Validators.minLength(5)]],
           confirm_password: ['', [Validators.required, Validators.minLength(5)]],
        });
    }


    get f(){
        return this.changePasswordGroup.controls;
    }

    changePassword(){
        if(this.changePasswordGroup.valid){
            if(this.f.new_password.value == this.f.confirm_password.value){

                this.userService.changePassword(this.f.old_password.value, this.f.new_password.value)
                    .subscribe(
                        (succ) => {
                            this.successMessage = succ.successMessage as string;
                            this.errorMessage = null;
                        },
                        (err) => {
                            this.errorMessage = err.error.errorMessage;
                            this.successMessage = null;
                        }
                    )
            }
            // password error match
            else {
                this.errorMessage = 'The new password is not confirmed!';
            }

        }


    }

}
