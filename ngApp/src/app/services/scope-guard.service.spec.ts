/**
 * Created by cliff on 9/8/2017.
 */

import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';
import { ScopeGuardService } from './scope-guard.service';
import {AuthHttp} from "angular2-jwt";
import {RouterTestingModule} from "@angular/router/testing";

describe('ScopeGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ScopeGuardService, AuthService, AuthHttp]
    });
  });

  it('should ...', inject([ScopeGuardService], (service: ScopeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
