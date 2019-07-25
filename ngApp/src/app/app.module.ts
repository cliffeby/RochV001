import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { SafePipe } from './safe.pipe';
import { ScorecardService} from "./services/scorecard.service";
import { ScorecardsComponent} from "./components/scorecards/scorecards.component";
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
import { MemberService} from './services/member.service';
import { MatchService} from './services/match.service';
import { ScoreService} from './services/score.service';
import { MatchAddPlayerComponent } from './components/match-add-player/match-add-player.component';
import { MemberBlockComponent } from './components/member-block/member-block.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SearchFilterPipe } from './search.pipe';
import { AuthService} from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ScopeGuardService} from './services/scope-guard.service';
import { DataService} from './components/aaa-sanity/shared/data.service';
import { AAASanityComponent } from './components/aaa-sanity/aaa-sanity.component';
import { AAAService, User} from "./components/aaa-sanity/shared/mockHttp.service";
import { MatchPairComponent } from './components/match-pair/match-pair.component';
import { CounterComponent } from './components/aa1-sanity/aaChild-sanity.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { MatFormFieldModule, ErrorStateMatcher } from '@angular/material'
// import { MemberBookComponent } from './component/member-book/member-book.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}
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
    AAASanityComponent,
    MatchPairComponent,
    CounterComponent,
    // MemberBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MyDatePickerModule,
    NoopAnimationsModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    MaterialModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    DataService,
    AAAService,
    ScorecardService,
    ScoreService,
    MatchService,
    MemberService,
    AuthGuardService,
    ScopeGuardService,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
