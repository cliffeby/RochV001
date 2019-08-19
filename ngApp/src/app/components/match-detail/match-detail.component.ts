import {Component, OnInit, EventEmitter, NgModule, ɵConsole} from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { Match } from "../../models/match";
import { ScorecardService } from "../../services/scorecard.service"
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [ MaterialModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule, ValidationService]
})

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
  inputs: ['match'],
  outputs: ['updateMatchEvent', 'submitAddMatchEvent','deleteMatchEvent']
})
export class MatchDetailComponent implements OnInit {
  match: Match;
  selected: any;
  hidenewMatch: boolean;
  scorecards: Array<Scorecard>;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();
  private submitAddMatchEvent = new EventEmitter();
  public matchDetailForm: FormGroup;

  constructor( private _scorecardservice: ScorecardService, private fb: FormBuilder) {
    this.matchDetailForm = fb.group({
      name:"",
      date: "",
      course: ""
    })
  }

  ngOnInit() {
    if (this.match == null) {
      this.match = new Match();
    }
    this._scorecardservice.getScorecards()
      .subscribe(resSCData => this.scorecards = resSCData);
    this.matchDetailForm = this.fb.group({
      name: [this.match.name, [Validators.required, Validators.minLength(5)]],
      course: [this.match.scorecardId],
      date: [this.match.datePlayed, [Validators.required, ValidationService.dateValidator]]
    })
  }

  updateMatch() {
    let scorecard : any;
    this._scorecardservice.getScorecard(this.match.scorecardId)
      .subscribe((resSCData) => this.match.scName = resSCData.name);
    this.match.name = this.matchDetailForm.controls['name'].value;
    // console.log("DDDate", this.matchDetailForm.controls['date'].value);
    this.match.datePlayed = this.matchDetailForm.controls['date'].value;
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

  submitAddMatch() {
    let scorecard : any;
    this.match = new Match();
    this.hidenewMatch = false;
    this.match.name = this.matchDetailForm.controls['name'].value;
    console.log("DDDate", this.matchDetailForm.controls['date'].value, this.match);
    this.match.datePlayed = this.matchDetailForm.controls['date'].value;
    this.match.scorecardId = this.matchDetailForm.controls['course'].value
    this._scorecardservice.getScorecard(this.match.scorecardId)
      .subscribe(resSCData => {
        scorecard = resSCData;
      this.match.scName = scorecard.name;
      });
    this.submitAddMatchEvent.emit(this.match);
  }


  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }
}
