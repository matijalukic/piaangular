import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

    emptyMessage: string;

    companies: Array<Company>;

    name: string;
    city: string;
    agency: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private studentService: StudentService
    ) {
        this.emptyMessage = "There is no companies founded!";
        this.activatedRoute.queryParams.subscribe(
            (params) => {
                this.name = params['name'];
                this.agency = params['agency'];
                this.city = params['city'];
                console.log( ` ${this.name}  ${this.city} ${this.agency}`);


                this.studentService.findCompanies(this.name, this.city, -1, 9999999, this.agency)
                    .subscribe(
                        (companies) => {
                            this.companies = companies as Array<Company>;

                            if(this.companies && this.companies.length > 0){
                                this.emptyMessage = null;
                            }
                            else
                                this.emptyMessage = "There is no companies founded!";
                        }
                    );
            }
        );

    }


    ngOnInit() {}

}
