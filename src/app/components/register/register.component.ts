import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Company} from '../../models/company';
import {Person} from '../../models/person';
import {Student} from '../../models/student';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    // student/company
    selectedUser = 'company';
    errorMessages: Array<String> = [];
    successMessage: string;

    // users
    inputUser = {} as User;
    inputCompany = {} as Company;
    inputPerson = {} as Person;
    inputStudent = {} as Student;

    userFormGroup: FormGroup;
    studentFormGroup: FormGroup;
    companyFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    private passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
        const passwordControl = c.get('password');
        const confirmPasswordControl = c.get('confirm_password');

        if (passwordControl.pristine || confirmPasswordControl.pristine) {
            return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            return null;
        }
        return { 'match': true };
    }


    ngOnInit() {
        this.userFormGroup = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password: ['', [Validators.required]],
            email: [ '', Validators.email]
        });

        this.companyFormGroup = this.fb.group({
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            director: ['', [Validators.required]],
            pib: ['', [Validators.required]],
            employees: ['', [Validators.required]],
            domain: ['', [Validators.required]],
            agency: ['it', [Validators.required]],
            specialty: ['', [Validators.required]],
        });

        this.studentFormGroup = this.fb.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            tel: ['', [Validators.required]],
            years: ['', [Validators.required]],
            graduated: ['', [Validators.required]],
        });
    }

    usernameTaken: boolean = false;
    emailTaken: boolean = false;

    checkUsername(){
        if(this.userFormGroup.controls.username.valid)
            this.userService.countUsernames(this.userFormGroup.controls.username.value).subscribe((res) => {
                this.usernameTaken = res > 0;
            });
    }

    checkEmail(){
        if(this.userFormGroup.controls.email.valid)
            this.userService.countEmails(this.userFormGroup.controls.email.value).subscribe((res) => {
                this.emailTaken = res > 0;
            });
    }


    register(){
        if(this.userFormGroup.valid){
            console.log('register');
            if(this.selectedUser == 'company'){

                if(this.companyFormGroup.valid){
                    // send registration
                    this.userService.register(this.inputUser, null, null, this.inputCompany)
                        .subscribe(
                            (res) => {
                                this.successMessage = res.successMessage;
                            },
                            (err) => {
                                this.errorMessages.push(err.error.errorMessage);
                            }
                        );
                }
                // company is not valid
                else{
                    if(!this.companyFormGroup.controls.name.valid) this.errorMessages.push('Company name is not valid!');
                    if(!this.companyFormGroup.controls.address.valid) this.errorMessages.push('Company address is not valid!');
                    if(!this.companyFormGroup.controls.city.valid) this.errorMessages.push('Company city is not valid!');
                    if(!this.companyFormGroup.controls.director.valid) this.errorMessages.push('Company director is not valid!');
                    if(!this.companyFormGroup.controls.employees.valid) this.errorMessages.push('Company employees is not valid!');
                    if(!this.companyFormGroup.controls.domain.valid) this.errorMessages.push('Company domain is not valid!');
                    if(!this.companyFormGroup.controls.agency.valid) this.errorMessages.push('Company agency is not valid!');
                    if(!this.companyFormGroup.controls.specialty.valid) this.errorMessages.push('Company specialty is not valid!');
                }

            }
            // selected student
            else {
                if(this.studentFormGroup.valid){
                    // send registration
                    this.userService.register(this.inputUser, this.inputPerson, this.inputStudent, null)
                        .subscribe(
                            (res) => {
                                this.successMessage = res.successMessage;
                            },
                            (err) => {
                                this.errorMessages.push(err.error.errorMessage);
                            }
                        );
                }
                // student group invalid
                else {
                    if(!this.companyFormGroup.controls.name.valid) this.errorMessages.push('Person name is not valid!');
                    if(!this.companyFormGroup.controls.surname.valid) this.errorMessages.push('Person surname is not valid!');
                    if(!this.companyFormGroup.controls.tel.valid) this.errorMessages.push('Person telephone is not valid!');
                    if(!this.companyFormGroup.controls.years.valid) this.errorMessages.push('Student years field is not valid!');
                    if(!this.companyFormGroup.controls.graduated.valid) this.errorMessages.push('Student graduated field is not valid!');

                }
            }

        }
        // User form group is not valid
        else {
            this.errorMessages = [];
            if(!this.userFormGroup.controls.username.valid)
                this.errorMessages.push('Username is not valid!');
            if(!this.userFormGroup.controls.password.valid)
                this.errorMessages.push('Password is not valid!');
            if(!this.userFormGroup.controls.confirm_password.valid)
                this.errorMessages.push('Confirm password is not valid!');
            if(!this.userFormGroup.controls.email.valid)
                this.errorMessages.push('Email is not valid!');
        }


    }


}
