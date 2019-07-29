import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScorecardDetailComponent } from './scorecard-detail.component';
import { Scorecard } from '../../models/scorecard';
import { MatFormFieldModule, ErrorStateMatcher } from '@angular/material'
import { ControlMessagesComponent } from '../../helpers/control-messages/control-messages.component'
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'


describe('ScorecardDetailComponent', () => {
  let component: ScorecardDetailComponent;
  let fixture: ComponentFixture<ScorecardDetailComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ScorecardDetailComponent, ControlMessagesComponent],
      imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ScorecardDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });

  it('component method onInitYardstoString should exist', () => {
    expect(component.onInitYardsString).toBeTruthy;
  })

  it('component method onInitYardstoString return a partial YARDS string', () => {
    let scorecard = new Scorecard();
    scorecard.yardsInputString = "";
    expect(component.onInitYardsString(scorecard)).toEqual(['YARDS', '', '0', '0', '0']);
  })

  it('component method onInitYardstoString return a full YARDS string', () => {
    let scorecard = new Scorecard();
    scorecard.yardsInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitYardsString(scorecard))
      .toEqual(['YARDS', '1', '1', '1', '1', '1', '1', '1', '1', '1', '9', '2', '2', '2', '2', '2', '2', '2', '2', '2', '18', '27']);
  })
  // TODO Handle non-numerics
  it('component method onInitYardstoString return an error string', () => {
    let scorecard = new Scorecard();
    scorecard.yardsInputString = "1,a,1";
    expect(component.onInitYardsString(scorecard)).toEqual(['YARDS', '1', 'a', '1', '0', '0', '0']);
  })

  it('component method onInitParstoString return a partial PARS string', () => {
    let scorecard = new Scorecard();
    scorecard.parInputString = "";
    expect(component.onInitParsString(scorecard)).toEqual(['PAR', '', '0', '0', '0']);
  })

  it('component method onInitParstoString return a full PARS string', () => {
    let scorecard = new Scorecard();
    scorecard.parInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitParsString(scorecard))
      .toEqual(['PAR', '1', '1', '1', '1', '1', '1', '1', '1', '1', '9', '2', '2', '2', '2', '2', '2', '2', '2', '2', '18', '27']);
  })

  it('component method onInitParstoString return an error string', () => {
    let scorecard = new Scorecard();
    scorecard.parInputString = "1,a1,1";
    expect(component.onInitParsString(scorecard)).toEqual(['PAR', '1', 'a1', '1', '0', '0', '0']);
  })

  it('component method onInitHcapstoString return a partial HCAPS string', () => {
    let scorecard = new Scorecard();
    scorecard.hCapInputString = "";
    expect(component.onInitHcapsString(scorecard)).toEqual(['HCAP', '', '  ']);
  })

  it('component method onInitHcapstoString return a full HCAPS string', () => {
    let scorecard = new Scorecard();
    scorecard.hCapInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitHcapsString(scorecard))
      .toEqual(['HCAP', '1', '1', '1', '1', '1', '1', '1', '1', '1', '  ', '2', '2', '2', '2', '2', '2', '2', '2', '2']);
  })

  it('component method onInitHcapstoString return an error string', () => {
    let scorecard = new Scorecard();
    scorecard.hCapInputString = "1,a2,1";
    expect(component.onInitHcapsString(scorecard)).toEqual(['HCAP', '1', 'a2', '1', '  ']);
  })

});
