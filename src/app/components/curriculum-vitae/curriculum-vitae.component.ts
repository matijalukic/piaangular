import {Component, Input, OnInit} from '@angular/core';
import {CurriculumVitae} from '../../models/curriculumvitae';

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {

    @Input()
    curriculumVitae: CurriculumVitae;

    constructor() { }

    ngOnInit() {
    }

}
