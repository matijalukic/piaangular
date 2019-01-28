import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../../services/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../models/company';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-find-company',
  templateUrl: './find-company.component.html',
  styleUrls: ['./find-company.component.css']
})
export class FindCompanyComponent implements OnInit {

    searchFormGroup: FormGroup;
    errorMessage: string;
    contentMessage: string;
    showingCompanies: Array<Company>;


    constructor(
        private studentService: StudentService,
        private fb : FormBuilder
    ) { }

    ngOnInit() {
        this.searchFormGroup = this.fb.group({
           name: [''],
           city: [''],
           min_employees: [0],
           max_employees: [10000],
           agency: ['it']
        });


        this.studentService.findCompanies('', '', 0, 100000, 'it')
            .subscribe(
                (res) =>{
                    this.showingCompanies = res as Array<Company>;
                    if(this.showingCompanies.length == 0)
                        this.contentMessage = 'The search has returned 0 results!';
                }
            );

    }

    get f(){
        return this.searchFormGroup.controls;
    }

    // run search
    search(){
        if(this.searchFormGroup.valid){
            this.studentService.findCompanies(this.f.name.value, this.f.city.value, this.f.min_employees.value,this.f.max_employees.value, this.f.agency.value)
                .subscribe(
                    (res) =>{
                        console.log(res);
                        this.showingCompanies = res as Array<Company>;
                        if(this.showingCompanies.length == 0)
                            this.contentMessage = 'The search has returned 0 results!';
                    }
                );
        }
        else
            this.errorMessage = 'Form is not valid!';
    }
}
