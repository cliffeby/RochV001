import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { VideoCenterComponent } from "./video-center/video-center.component";
import {ScorecardsComponent} from "./components/scorecards/scorecards.component";
import {MatchCenterComponent} from "./components/match-center/match-center.component";
import {MemberCenterComponent} from "./components/member-center/member-center.component";
import {ScoreCenterComponent} from "./components/score-center/score-center.component";

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'videos', component: VideoCenterComponent},
  {path:  'scorecards', component: ScorecardsComponent},
  {path:  'matches', component: MatchCenterComponent},
  {path:  'members', component: MemberCenterComponent},
  {path:  'scores', component: ScoreCenterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
