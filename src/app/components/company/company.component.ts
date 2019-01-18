import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../models/company';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    id: number;
    @Input()
    showingCompany: Company;
    errorMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
                private companyService: CompanyService) {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
        });

    }

    ngOnInit() {
        this.companyService.find(this.id)
            .subscribe((company) => {
                if(company) {
                    this.errorMessage = null;
                    this.showingCompany = company as Company;
                }
                else
                    this.errorMessage = 'Company not founded!';
            },
            (errResponse) => {
                this.errorMessage = errResponse.error.errorMessage;
            });

    }

}
