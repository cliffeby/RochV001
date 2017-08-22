import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { SafePipe } from './safe.pipe';
import {ScorecardService} from "./services/scorecard.service";
import {ScorecardsComponent} from "./components/scorecards/scorecards.component";
import { ScorecardDetailComponent } from './components/scorecard-detail/scorecard-detail.component';
import { ScorecardListComponent } from './components/scorecard-list/scorecard-list.component';
import { MatchCenterComponent } from './components/match-center/match-center.component';
import { MatchDetailComponent } from './components/match-detail/match-detail.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MemberCenterComponent } from './components/member-center/member-center.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { ScoreCenterComponent } from './components/score-center/score-center.component';
import { ScoreListComponent } from './components/score-list/score-list.component';
import { ScoreDetailComponent } from './components/score-detail/score-detail.component';
import {MemberService} from "./services/member.service";
import {MatchService} from "./services/match.service";
import {ScoreService} from "./services/score.service";
import {UserService} from "./services/user.service";
import { MatchAddPlayerComponent } from './components/match-add-player/match-add-player.component';
import { MemberBlockComponent } from './components/member-block/member-block.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SearchFilterPipe } from './search.pipe';
import { SignupComponent } from './components/signup/signup.component';
import { UserCenterComponent } from './components/user-center/user-center.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoCenterComponent,
    VideoListComponent,
    VideoDetailComponent,
    SafePipe,
    ScorecardsComponent,
    ScorecardDetailComponent,
    ScorecardListComponent,
    MatchCenterComponent,
    MatchDetailComponent,
    MatchListComponent,
    MemberCenterComponent,
    MemberDetailComponent,
    MemberListComponent,
    ScoreCenterComponent,
    ScoreListComponent,
    ScoreDetailComponent,
    MatchAddPlayerComponent,
    MemberBlockComponent,
    SearchFilterPipe,
    SignupComponent,
    UserCenterComponent,
    UserDetailComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule
  ],
  providers: [
    ScorecardService,
    ScoreService,
    MatchService,
    MemberService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
