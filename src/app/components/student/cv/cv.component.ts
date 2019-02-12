import { Component, OnInit } from '@angular/core';
import {CurriculumVitae} from '../../../models/curriculumvitae';
import {UserService} from '../../../services/user.service';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {

    curriculumVitae: CurriculumVitae;
    errorMessage: string;

    constructor(
        private userService: UserService,
        private studentService: StudentService
    ) {
        // Parse the student
        userService.isStudent().subscribe(
            (foundedStudent) => {
                // parse the CV
                this.curriculumVitae = JSON.parse(foundedStudent.cv) as CurriculumVitae;
            }
        )
    }

    ngOnInit() {
    }

    acceptCV(cv: CurriculumVitae){
        this.studentService.leaveCV(JSON.stringify(cv)).subscribe(
            (succ) => {
                this.curriculumVitae = cv;
            },
            (err) => {
                this.errorMessage = err.error.errorMessage;
            }
        );
    }

    removeCV(){
        this.studentService.leaveCV(null).subscribe(
            (succ) => {
                this.curriculumVitae = null;
            },
            (err) => {
                this.errorMessage = err.error.errorMessage;
            }
        );
    }

}
