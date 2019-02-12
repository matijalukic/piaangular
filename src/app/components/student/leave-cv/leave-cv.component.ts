import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurriculumVitae, Education, Messiging, Telephone, WorkExperince} from '../../../models/curriculumvitae';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-leave-cv',
  templateUrl: './leave-cv.component.html',
  styleUrls: ['./leave-cv.component.css']
})
export class LeaveCVComponent implements OnInit {

    @Input()
    postedCV: CurriculumVitae;

    curriculumVitae = {
        telephones : [],
        websites: [],
        messiging: [],
        workExperinence: [],
        educations: []
    } as CurriculumVitae;

    @Output()
    onPostCV  = new EventEmitter<CurriculumVitae>();

    websiteControl: FormControl;
    newTelephoneType: FormControl;
    newTelephoneNumber: FormControl;
    usernameControl: FormControl;
    providerControl: FormControl;

    workGroup: FormGroup;
    educationGroup: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.websiteControl = new FormControl();
        this.websiteControl.setValidators(Validators.required)

        this.newTelephoneType = new FormControl();
        this.newTelephoneType.setValidators(Validators.required)
        this.newTelephoneNumber = new FormControl();
        this.newTelephoneNumber.setValidators(Validators.required);

        this.providerControl = new FormControl();
        this.providerControl.setValidators(Validators.required);
        this.usernameControl = new FormControl();
        this.usernameControl.setValidators(Validators.required);

        this.workGroup = this.fb.group(
            {
                from: ['', [Validators.required]],
                to: ['', [Validators.required]],
                ongoing: [false],
                position: ['', [Validators.required]],
                city: ['', [Validators.required]],
                employer: ['', [Validators.required]],
                country: ['', [Validators.required]],
                mainActivities: ['', [Validators.required]]
            }
        );

        this.educationGroup = this.fb.group({
            from: ['', [Validators.required]],
            to: ['', [Validators.required]],
            ongoing: [false],
            title: ['', [Validators.required]],
            organisation: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
        });

    }

    ngOnInit() {

    }


    addTelephone(){
        if(this.newTelephoneType.valid && this.newTelephoneNumber.valid) {
            let newTelephone = {
                type: this.newTelephoneType.value,
                number: this.newTelephoneNumber.value
            } as Telephone;
            this.curriculumVitae.telephones.push(newTelephone);

            this.newTelephoneNumber.reset();
            this.newTelephoneType.reset();
        }
    }


    addWebsite(){
        if(this.websiteControl.valid){
            this.curriculumVitae.websites.push(this.websiteControl.value);
            this.websiteControl.reset();
        }
    }

    addMessiging(){
        if(this.providerControl.valid && this.usernameControl.valid) {
            let newMessage = {
                provider: this.providerControl.value,
                username: this.usernameControl.value
            } as Messiging;

            this.curriculumVitae.messiging.push(newMessage);

            this.providerControl.reset();
            this.usernameControl.reset();
        }
    }


    get workF(){
        return this.workGroup.controls;
    }

    get educationForm(){
        return this.educationGroup.controls;
    }

    addWork(){
        if(this.workGroup.valid){
            let newWork = {
                from: this.workF.from.value,
                to: this.workF.to.value,
                ongoing: this.workF.ongoing.value,
                position: this.workF.position.value,
                city: this.workF.city.value,
                employer: this.workF.employer.value,
                country: this.workF.country.value,
                mainActivities: this.workF.mainActivities.value,
            } as WorkExperince;

            this.curriculumVitae.workExperinence.push(newWork);
            this.workGroup.reset();
        }
        else {
            console.log(this.workGroup.getRawValue());
        }


    }

    addEducation(){
        if(this.educationGroup.valid){
            let newEducation = {
                from: this.educationForm.from.value,
                to: this.educationForm.to.value,
                ongoing: this.educationForm.ongoing.value,
                title: this.educationForm.title.value,
                city: this.educationForm.city.value,
                organisation: this.educationForm.organisation.value,
                country: this.educationForm.country.value
            } as Education;

            this.curriculumVitae.educations.push(newEducation);
            this.educationGroup.reset();
        }
    }

    leaveCV(){
        this.onPostCV.emit(this.curriculumVitae);

    }
}

