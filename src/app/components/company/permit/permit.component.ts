import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Permit} from '../../../models/permit';
import {FairsService} from '../../../services/fairs.service';

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.css']
})
export class PermitComponent implements OnInit {

    @Input()
    permit: Permit;

    @Output()
    messenger = new EventEmitter<string>();


    constructor(
        private fairsService: FairsService
    ) { }

    ngOnInit() {
        this.fairsService.findPermitById(this.permit.id)
            .subscribe((res) => {
                 this.permit = res as Permit;
            });

    }

    cancelParticipation(){
        this.fairsService.cancelParticipate(this.permit)
            .subscribe((succRes) => {
                this.permit = null;
                this.messenger.emit(succRes.successMessage);
            });
    }

}
