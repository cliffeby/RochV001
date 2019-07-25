import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule, ErrorStateMatcher } from '@angular/material'
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { ScorecardService } from "../../services/scorecard.service"
import { NgModel } from '@angular/forms';


export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@NgModule({
  imports: [
    MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, ErrorStateMatcher
  ],
  exports: [
    MatInputModule, MatFormFieldModule
  ]
})

@Component({
  selector: 'scorecard-detail',
  templateUrl: './scorecard-detail.component.html',
  styleUrls: ['./scorecard-detail.component.css'],
  inputs: ['scorecard'],
  outputs: ['updateScorecardEvent', 'deleteScorecardEvent']
})
export class ScorecardDetailComponent implements OnInit {
  // @Output() updateScorecardEvent = new EventEmitter<Scorecard>();
  // scorecard: any;

  // private editTitle: boolean = false;

  // private deleteScorecardEvent = new EventEmitter();

  constructor() {
  }

  scorecard: Scorecard;
  public scorecardForm: FormGroup;
  public parsForm: FormControl;
  public hCapsForm: FormControl;
  public yardsForm: FormControl;
  errorMatcher = new CrossFieldErrorMatcher();

  private editTitle: boolean = false;
  private updateScorecardEvent = new EventEmitter();
  private deleteScorecardEvent = new EventEmitter();

  ngOnInit() {
    this.scorecard.hCaps = this.onInitHcapsString(this.scorecard);
    this.scorecard.yards = this.onInitYardsString(this.scorecard);
    this.scorecard.pars = this.onInitParsString(this.scorecard);
    console.log('Scorecard', this.scorecard)
    this.scorecardForm = new FormGroup({});
    this.parsForm = new FormControl('', [Validators.required, Validators.maxLength(10), this.parsValidator])
    this.parsForm.setValue(this.scorecard.parInputString);
    this.hCapsForm = new FormControl('', [Validators.required, Validators.maxLength(10), this.parsValidator])
    this.hCapsForm.setValue(this.scorecard.hCapInputString);
  }
  parsValidator(control: FormControl) {
    const condition1 = control.value;
    let parEntry: Number = condition1.substring(condition1.length - 1, condition1.length)
    if (parEntry < 3 || parEntry > 5) {
      console.log('Condition', condition1, 'Error', condition1.substring(condition1.length - 1, condition1.length));
      return { parsValue: { condition: control.get.name } };
    }
    else if (condition1.length < 35) {
      console.log('ConditionL', condition1.length);
      return { parsLenShort: { condition: condition1.length } }
    }
    else if (condition1.length > 36) {
      console.log('ConditionL', condition1.length);
      return { parsLenLong: { condition: condition1.length } }
    }
    else {
      console.log('Condition', condition1, "Null", condition1.substring(condition1.length - 2, condition1.length - 1));
      return null;
    }
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
    console.log("onInitParsStrings", scorecard.parInputString, pars);
    pars.splice(10, 0, String(front9Par));
    pars.splice(20, 0, String(back9Par));
    pars.splice(21, 0, String(total18Par));
    console.log(pars);
    return pars;
  }
  onInitHcapsString(scorecard: Scorecard) {
    let hCaps: string[] = ('HCAP,' + scorecard.hCapInputString).split(',');
    hCaps.splice(10, 0, '  ');
    return hCaps;
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateScorecard() {
    this.scorecard.hCaps = this.onInitHcapsString(this.scorecard);
    this.scorecard.yards = this.onInitYardsString(this.scorecard);
    this.scorecard.pars = this.onInitParsString(this.scorecard);
    this.scorecard.parInputString = this.parsForm.value;
    console.log('SCORECARD DETAIL this.scorecard', this.scorecard)
    this.updateScorecardEvent.emit(this.scorecard);
  }

  deleteScorecard() {
    console.log('SCORECARD DETAIL Delete', this.scorecard)
    this.deleteScorecardEvent.emit(this.scorecard);
  }

}
