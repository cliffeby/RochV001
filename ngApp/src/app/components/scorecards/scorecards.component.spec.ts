import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ScorecardDetailComponent} from '../scorecard-detail/scorecard-detail.component';
import {ScorecardListComponent} from '../scorecard-list/scorecard-list.component';
import { ScorecardsComponent } from './scorecards.component';
import {AuthService} from "../../services/auth.service";
import {ScorecardService} from "../../services/scorecard.service";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthHttp} from "angular2-jwt";
import {FormsModule} from "@angular/forms";
import { MatFormFieldModule, ErrorStateMatcher } from '@angular/material'
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { ControlMessagesComponent } from '../../helpers/control-messages/control-messages.component';
import { format } from 'url';


// Mock our Auth service
export class MockAuthService {
  isAuthenticated() {
  };
  logout() {
  };
}
export class MockAuthHttp {
  get(){}
};
export class MockScorecardService {
  getScorecards(){return true};
};

describe('ScorecardsComponent', () => {
  // let service: ScorecardService;
  // let myServiceDependancy: AuthHttp;
  let component: ScorecardsComponent;
  let fixture: ComponentFixture<ScorecardsComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, MatFormFieldModule, ReactiveFormsModule],
      declarations: [ ScorecardsComponent, ScorecardDetailComponent, ScorecardListComponent, ControlMessagesComponent ],
      providers: [
        {provide: ScorecardService, useClass: MockScorecardService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(ScorecardsComponent);
    component = fixture.componentInstance;
    let _scorecardservice = new MockScorecardService();
    fixture.detectChanges();

  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});

