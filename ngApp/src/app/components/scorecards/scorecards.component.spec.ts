import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ScorecardDetailComponent} from '../scorecard-detail/scorecard-detail.component';
import {ScorecardListComponent} from '../scorecard-list/scorecard-list.component';
import { ScorecardsComponent } from './scorecards.component';
import {AuthService} from "../../services/auth.service";
import {ScorecardService} from "../../services/scorecard.service";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthHttp} from "angular2-jwt";
import {FormsModule} from "@angular/forms";

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
  getMembers(){}
};

describe('ScorecardsComponent', () => {
  let service: ScorecardService;
  let myServiceDependancy: AuthHttp;
  let component: ScorecardsComponent;
  let fixture: ComponentFixture<ScorecardsComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ ScorecardsComponent, ScorecardDetailComponent, ScorecardListComponent ],
      providers: [
        ScorecardService,
        { provide: ScorecardService, useClass: MockScorecardService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});
