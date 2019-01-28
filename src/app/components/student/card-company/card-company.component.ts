import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../../models/company';

@Component({
  selector: 'app-card-company',
  templateUrl: './card-company.component.html',
  styleUrls: ['./card-company.component.css']
})
export class CardCompanyComponent implements OnInit {

    @Input()
    packageName: string = null;

    @Input()
    showingCompany: Company;

    constructor() { }

    ngOnInit() {
    }

}
