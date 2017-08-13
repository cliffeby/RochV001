import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ScorecardDetailComponent} from '../scorecard-detail/scorecard-detail.component';
import {ScorecardListComponent} from '../scorecard-list/scorecard-list.component';
import { ScorecardsComponent } from './scorecards.component';

describe('ScorecardsComponent', () => {
  let component: ScorecardsComponent;
  let fixture: ComponentFixture<ScorecardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardsComponent, ScorecardDetailComponent, ScorecardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
