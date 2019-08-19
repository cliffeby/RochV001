import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {ScorecardsComponent} from "./components/scorecards/scorecards.component";
import {MatchCenterComponent} from "./components/match-center/match-center.component";
import {MemberCenterComponent} from "./components/member-center/member-center.component";
import {ScoreCenterComponent} from "./components/score-center/score-center.component";
import {ScopeGuardService as ScopeGuard} from "./services/scope-guard.service";
import {AuthGuardService as AuthGuard} from "./services/auth-guard.service";


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path:  'scorecards', component: ScorecardsComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['read:scorecards']}},
  {path:  'matches', component: MatchCenterComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['read:matches','read:scorecards', 'read:members']}},
  { path: 'members', component: MemberCenterComponent, canActivate: [ScopeGuard], data: { expectedScopes: [ 'read:members'] } },
  { path: 'scores', component: ScoreCenterComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['read:scores', 'remove:score'] } }
];

// {path:  'members', component: MemberCenterComponent, canActivate: [ScopeGuard], data: { expectedScopes: [' read:members']} },
// {path:  'scores', component: ScoreCenterComponent, canActivate: [ScopeGuard] , data: { expectedScopes: [' read:scores']}}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
