import { Component, OnInit } from '@angular/core';
import {Fair} from '../../../models/fair';
import {FairsService} from '../../../services/fairs.service';
import {Company} from '../../../models/company';
import {UserService} from '../../../services/user.service';
import {Permit} from '../../../models/permit';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent implements OnInit {

    successMessage: string;
    errorMessage: string;
    fairs: Array<Fair>;
    permits: Array<Permit>;
    loggedCompany: Company;

    // packageControl: FormControl;
    // additionalsControl: FormControl;
    // fairControl: FormControl;

    formGroup: FormGroup;


    constructor(
        private fairsService: FairsService,
        private userService: UserService,
        private fb: FormBuilder
    ) {
    }

    private loadAll(){
        // load company
        this.userService.isCompany()
            .subscribe((company) =>{
                this.loggedCompany = company as Company;

                // fetch the participations in fairs
                this.fairsService.findPermits(this.loggedCompany).subscribe((res)=> {
                    this.permits = res as Array<Permit>;
                });


                // load fairs
                this.fairsService.companyFairs(this.loggedCompany.id)
                    .subscribe(
                        (fairs) => {
                            this.fairs = fairs as Array<Fair>;
                        }
                    );

            },(e) => this.errorMessage = e);

    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            packageID: ['', Validators.required],
            additionals: ['']
        });

        this.loadAll();
    }

    // company participate in fair
    // @return Permit
    participateIn(company: Company, fair: Fair): boolean{
        let filteredPermits = fair.permits.filter((permit, i) => {
            return permit.company_id == company.id;
        });
        if(filteredPermits.length == 0)
            return false;
        return true;;
    }

    // when the cancels participation
    notify(newMessage: string){
        // set success message
        this.successMessage = newMessage;
        // load all data
        this.loadAll();
    }

    get f(){
        return this.formGroup.controls;
    }

    newParticipation(fair: Fair){
        if(this.formGroup.valid){
            this.fairsService.newPermit(this.f.packageID.value, this.f.additionals.value, fair.id, this.loggedCompany)
                .subscribe((succ) => {
                    this.successMessage = succ.successMessage

                    this.loadAll();

                }, (e) => {
                    console.log(e);
                    this.errorMessage = e.errors.errorMessage;
                });

        }
        else{
            console.log(this.f.packageID);
            console.log(this.f.fairID);

            console.log("Controls invalids!");
        }

    }


}
