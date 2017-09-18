/**
 * Created by cliff on 9/8/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ScopeGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const scopes = (route.data as any).expectedScopes;
    console.log('SCOPEGUARD SCOPES',scopes, this.auth.isAuthenticated(), this.auth.userHasScopes(scopes));

    if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
