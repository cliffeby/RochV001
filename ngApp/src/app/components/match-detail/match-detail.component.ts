import {Component, OnInit, EventEmitter, NgModule} from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { ScorecardService } from "../../services/scorecard.service"
import {IMyDpOptions} from 'mydatepicker';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    BrowserAnimationsModule, FormsModule, MatSelectModule
  ],
  exports: [
    MatInputModule, MatFormFieldModule, MatSelectModule
  ]
})

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
  inputs: ['match'],
  outputs: ['updateMatchEvent', 'deleteMatchEvent']
})
export class MatchDetailComponent implements OnInit {
  match: any;
  selected: any;
  fb: FormBuilder;
  scorecards: Array<Scorecard>;
  private myDatePickerOptions: IMyDpOptions = {
    // other options... see https://github.com/kekeh/mydatepicker
    dateFormat: 'mm.dd.yyyy',
    firstDayOfWeek: 'su',
    satHighlight: true
  };
  // Initialized to specific date (09.10.2018).
  //private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  private model: any;
  private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();
  public matchDetailForm: FormGroup;

  constructor( private _scorecardservice: ScorecardService) {
  }

  ngOnInit() {
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => this.scorecards = resSCData);
    this.model =  this.match.datePlayed;
    if (this.match.datePlayed){
      var dateArray = this.match.datePlayed.split('-');
      this.model = { date: { year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2]) } };
    }
    this.selected = this.match.course;
    this.matchDetailForm = this.fb.group({
      name: [this.match.name, [Validators.required, Validators.minLength(5)]],
      date: [this.match.date],
      course: [this.match.course]
    })
  }

  updateMatch() {
    //TODO DATE PLAYED is not stored as a DATE object on client
    this.match.datePlayed = (this.model.date.year+'-'+this.model.date.month+'-'+this.model.date.day);
    this._scorecardservice.getScorecard(this.match.scorecardId)
      .subscribe((resSCData) => this.match.scName = resSCData.name);
    this.updateMatchEvent.emit(this.match);
    this.match.name = this.matchDetailForm.controls['name'].value
    this.match.name = this.matchDetailForm.controls['date'].value
    this.match.name = this.matchDetailForm.controls['course'].value
    }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }
}
