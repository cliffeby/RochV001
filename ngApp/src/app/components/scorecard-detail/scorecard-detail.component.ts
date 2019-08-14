import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { MaterialModule } from "../../material.module"
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { ScorecardService } from "../../services/scorecard.service"
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@NgModule({
  imports: [
    MaterialModule, ReactiveFormsModule
  ]
})

@Component({
  selector: 'scorecard-detail',
  templateUrl: './scorecard-detail.component.html',
  styleUrls: ['./scorecard-detail.component.css'],
  inputs: ['scorecard'],
  outputs: ['updateScorecardEvent', 'deleteScorecardEvent', 'submitAddScorecardEvent']
})

export class ScorecardDetailComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.scorecardForm1 = fb.group({
      name: ['', [Validators.required, ValidationService.nameValidator]],
      rating: '',
      slope: '',
      parsInputString: [''],
      hCapsInputString: [''],
      yardsInputString: ['']
    })
  }

  scorecard: Scorecard;
  public scorecardForm1: FormGroup;
  private updateScorecardEvent = new EventEmitter();
  private deleteScorecardEvent = new EventEmitter();
  private submitAddScorecardEvent = new EventEmitter();

  ngOnInit() {
    if (this.scorecard == null) {
      this.scorecard = new Scorecard();
      this.scorecard.parInputString = '';
      this.scorecard.hCapInputString = '';
      this.scorecard.yardsInputString = '';
    }
    this.scorecard.hCaps = this.onInitHcapsString(this.scorecard);
    this.scorecard.yards = this.onInitYardsString(this.scorecard);
    this.scorecard.pars = this.onInitParsString(this.scorecard);

    this.scorecardForm1 = this.fb.group({
      name: [this.scorecard.name, [Validators.required, Validators.minLength(5)]],
      rating: [this.scorecard.rating],
      slope: [this.scorecard.slope],
      parsInputString: [this.scorecard.parInputString, [Validators.required, ValidationService.parsValidator]],
      hCapsInputString: [this.scorecard.hCapInputString, [Validators.required, ValidationService.hCapsValidator]],
      yardsInputString: [this.scorecard.yardsInputString, [Validators.required, ValidationService.yardsValidator]]
    })
  }

  onInitYardsString(scorecard: Scorecard) {
    let front9Yards: number = 0, back9Yards: number = 0;
    let yards: string[] = ('YARDS,' + scorecard.yardsInputString).split(',');
    for (var i = 1; i < yards.length - 9; i++) {
      front9Yards = front9Yards + Number(yards[i]);
    }
    for (var j = 10; j < yards.length; j++) {
      back9Yards += Number(yards[j]);
    }
    let total18Yards = front9Yards + back9Yards;
    yards.splice(10, 0, String(front9Yards));
    yards.splice(20, 0, String(back9Yards));
    yards.splice(21, 0, String(total18Yards));
    return yards;
  }
  onInitParsString(scorecard: Scorecard) {
    let front9Par: number = 0, back9Par: number = 0;
    let pars: string[] = ('PAR,' + scorecard.parInputString).split(',');
    for (var i = 1; i < pars.length - 9; i++) {
      front9Par = front9Par + Number(pars[i]);
    }
    for (var j = 10; j < pars.length; j++) {
      back9Par += Number(pars[j]);
    }
    let total18Par = front9Par + back9Par;
    pars.splice(10, 0, String(front9Par));
    pars.splice(20, 0, String(back9Par));
    pars.splice(21, 0, String(total18Par));
    return pars;
  }
  onInitHcapsString(scorecard: Scorecard) {
    let hCaps: string[] = ('HCAP,' + scorecard.hCapInputString).split(',');
    hCaps.splice(10, 0, '  ');
    return hCaps;
  }

  updateScorecard() {
    this.scorecard.name = this.scorecardForm1.controls['name'].value
    this.scorecard.rating = this.scorecardForm1.controls['rating'].value
    this.scorecard.slope = this.scorecardForm1.controls['slope'].value
    this.scorecard.parInputString = this.scorecardForm1.controls['parsInputString'].value
    this.scorecard.hCapInputString = this.scorecardForm1.controls['hCapsInputString'].value
    this.scorecard.yardsInputString = this.scorecardForm1.controls['yardsInputString'].value
    this.updateScorecardEvent.emit(this.scorecard);
  }

  addScorecard(){
    this.scorecard.name = this.scorecardForm1.controls['name'].value
    this.scorecard.rating = this.scorecardForm1.controls['rating'].value
    this.scorecard.slope = this.scorecardForm1.controls['slope'].value
    this.scorecard.parInputString = this.scorecardForm1.controls['parsInputString'].value
    this.scorecard.hCapInputString = this.scorecardForm1.controls['hCapsInputString'].value
    this.scorecard.yardsInputString = this.scorecardForm1.controls['yardsInputString'].value
    this.submitAddScorecardEvent.emit(this.scorecard);
  }

  deleteScorecard() {
    this.deleteScorecardEvent.emit(this.scorecard);
  }
}
