import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchCenterComponent } from './match-center.component';
import {AuthService} from "../../services/auth.service";
import {AuthHttp} from "angular2-jwt";
import {MatchService} from "../../services/match.service";
import {MemberService} from "../../services/member.service";
import {ScoreService} from "../../services/score.service";
import {ScorecardService} from "../../services/scorecard.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MatchDetailComponent} from "../match-detail/match-detail.component";
import {MatchListComponent} from "../match-list/match-list.component";
import {SearchFilterPipe} from "../../search.pipe";
import {FormsModule} from "@angular/forms";
import {MyDatePicker} from "mydatepicker";
import {MemberBlockComponent} from "../member-block/member-block.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {FocusDirective} from 'mydatepicker/dist//directives/my-date-picker.focus.directive';import * as moment from 'moment/moment';
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
export class MockDatePicker {};


describe('Match Center Component and Service: My: TestBed', () => {
  let component: MatchCenterComponent;
  let fixture: ComponentFixture<MatchCenterComponent>;
  let service: MatchService;
  let myServiceDependency: AuthHttp;


  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [FocusDirective, MatchCenterComponent, MatchDetailComponent, MatchListComponent, MemberBlockComponent, SearchFilterPipe],
      imports: [FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        MatchService,
        ScoreService,
        ScorecardService,
        MemberService,
        {provide: MyDatePicker, useClass: MockDatePicker},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
      .compileComponents();
  });
    beforeEach(() => {
      fixture = TestBed.createComponent(MatchCenterComponent);
      component = fixture.componentInstance; // BannerComponent test instance
      service = TestBed.get(MatchService);
      myServiceDependency = TestBed.get(AuthHttp);
    });

  it('should create a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should create an injected instance', inject([MatchService], (injectedService: MatchService) => {
    expect(injectedService).toBeDefined();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
    });
  });

