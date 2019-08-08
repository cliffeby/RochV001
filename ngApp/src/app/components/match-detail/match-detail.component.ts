import {Component, OnInit, EventEmitter, NgModule, ɵConsole} from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { Match } from "../../models/match";
import { ScorecardService } from "../../services/scorecard.service"
import { IMyDpOptions} from 'mydatepicker';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    BrowserAnimationsModule, FormsModule, MatSelectModule, MatDatepickerModule, MatMomentDateModule,
    ValidationService
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
  match: Match;
  selected: any;
  // selectedCourse: any;
  scorecards: Array<Scorecard>;
  dateCtrl: FormControl;
  // private myDatePickerOptions: IMyDpOptions = {
  //   // other options... see https://github.com/kekeh/mydatepicker
  //   dateFormat: 'mm.dd.yyyy',
  //   firstDayOfWeek: 'su',
  //   satHighlight: true
  // };
  // Initialized to specific date (09.10.2018).
  //private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  // private model: any;
  // private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();
  public matchDetailForm: FormGroup;
  // course = new FormControl('', [Validators.required]);

  constructor( private _scorecardservice: ScorecardService, private fb: FormBuilder) {
    this.matchDetailForm = fb.group({
      name:"",
      date: "",
      course: ""
    })
  }

  ngOnInit() {
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => this.scorecards = resSCData);
    // this.model =  this.match.datePlayed;
    // if (this.match.datePlayed){
    //   var dateArray = this.match.datePlayed.split('-');
    //   this.model = { date: { year: parseInt(dateArray[0]), month: parseInt(dateArray[1]), day: parseInt(dateArray[2]) } };
    // }
    this.matchDetailForm = this.fb.group({
      name: [this.match.name, [Validators.required, Validators.minLength(5)]],
      course: [this.match.scorecardId],
      date: [this.match.datePlayed]
    })
    // this.selected = this.match.scorecardId;
    // this.selectedCourse = this.match.scorecardId;
    this.dateCtrl = new FormControl('', [Validators.required]);
    this.dateCtrl.setValue(this.match.datePlayed);
  }

  updateMatch() {
    let scorecard : any;
    //TODO DATE PLAYED is not stored as a DATE object on client
    // this.match.datePlayed = (this.model.date.year+'-'+this.model.date.month+'-'+this.model.date.day);
    this._scorecardservice.getScorecard(this.match.scorecardId)
      .subscribe((resSCData) => this.match.scName = resSCData.name);

    this.match.name = this.matchDetailForm.controls['name'].value;
    console.log("DDDate", this.dateCtrl.value);
    this.match.datePlayed = this.dateCtrl.value;
    // this.match.scorecardId = this.matchDetailForm.controls['course'].value;
    this.match.scorecardId = this.matchDetailForm.controls['course'].value;

    if (this.match.scorecardId) {
      this._scorecardservice.getScorecard(this.match.scorecardId)
        .subscribe(resSCData => {
          scorecard = resSCData;
          this.match.scName = scorecard.name;
        });
      }
    this.updateMatchEvent.emit(this.match);
    }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }
}
