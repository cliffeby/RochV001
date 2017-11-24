import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchDetailComponent } from './match-detail.component';
import {MatchService} from "../../services/match.service";
import {ScorecardService} from "../../services/scorecard.service";
import {MyDatePicker} from "mydatepicker";
import {AuthService} from "../../services/auth.service";
import {AuthHttp} from "angular2-jwt";
import {FocusDirective} from 'mydatepicker/dist//directives/my-date-picker.focus.directive';
import {FormsModule} from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;
  let service: MatchService;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      providers: [
        MatchService,
        ScorecardService,
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp},
        {provide: MyDatePicker, useClass: MockDatePicker}],
      declarations: [ MatchDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
