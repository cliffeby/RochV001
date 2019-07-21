import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService} from "../../services/auth.service";
import {AuthHttp} from "angular2-jwt";
import { ScoreCenterComponent } from './score-center.component';
import { ScoreService} from "../../services/score.service";
import { RouterTestingModule} from "@angular/router/testing";
import {ScoreDetailComponent} from "../score-detail/score-detail.component";
import {ScoreListComponent} from "../score-list/score-list.component";
import { FormsModule } from "@angular/forms";
// import { Scorecard } from 'src/app/models/scorecard';

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
export class MockScoreService {
  getScores(){}
};
describe('ScoreCenterComponent', () => {
  let component: ScoreCenterComponent;
  let fixture: ComponentFixture<ScoreCenterComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ ScoreCenterComponent, ScoreDetailComponent, ScoreListComponent ],
      providers: [
        ScoreService,
       { provide: ScoreService, useClass: MockScoreService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
      .compileComponents();
  });
  beforeEach(async() => {
    fixture = TestBed.createComponent(ScoreCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});
