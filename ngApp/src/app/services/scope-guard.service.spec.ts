/**
 * Created by cliff on 9/8/2017.
 */

import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { ScopeGuardService } from './scope-guard.service';
import {AuthHttp} from "angular2-jwt";
import {RouterTestingModule} from "@angular/router/testing";
import {Routes, ActivatedRouteSnapshot, ActivatedRoute} from "@angular/router";
import {ScorecardsComponent} from "../components/scorecards/scorecards.component";

class MockAuthService{
  isAuthenticated(){return true};
  userHasScopes(scopes: Array<string>): boolean {
     const grantedScopes = ['read:scorecards', 'create:score'];
     const scope = 'read:scorecards';
     return scopes.every(scope => grantedScopes.includes(scope));
   }
}


describe('ScopeGuardService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
     // providers: [ScopeGuardService, AuthService, AuthHttp],
      providers: [ScopeGuardService, AuthHttp,
        {provide: AuthService, useClass: MockAuthService}
      ]
      })
      .compileComponents();
    });


  it('should create service', inject([ScopeGuardService], (service: ScopeGuardService) => {
    expect(service).toBeTruthy();
  }));


});
