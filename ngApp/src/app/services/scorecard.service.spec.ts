import { TestBed, inject} from '@angular/core/testing';
import {ScorecardService} from "../services/scorecard.service";
import { AuthService } from '../services/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { HttpClientTestingModule} from '@angular/common/http/testing';
// import 'rxjs/add/operator/map';

class MockAuthService {
  isAuthenticated() {};
}
class MockAuthHttp {
  get() {}
}

describe( 'ScorecardService' ,()=>{
  let service: ScorecardService;
  // let serviceDep1: MockAuthService;
  // let serviceDep2: MockAuthHttp;
  let scorecard: any;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [ScorecardService, {
        provide: AuthService, useClass: MockAuthService},{
        provide: AuthHttp, useClass: MockAuthHttp
      }]
    });
    service = TestBed.get(ScorecardService);
    // serviceDep1 = TestBed.get(AuthService);
    // serviceDep2 = TestBed.get(AuthHttp);
  });

  it('should create an instance', ()=>{
    expect(service).toBeDefined();
  });

  it('should be injectable', inject([ ScorecardService],(service:ScorecardService) =>{
    expect(service).toBeTruthy();
  }));

  // it('should inject dependency #1', () => {
  //   spyOn(serviceDep1, 'isAuthenticated');
  //   serviceDep1.isAuthenticated();
  //   expect(serviceDep1.isAuthenticated).toHaveBeenCalled();
  // });

  // it('should inject dependency #2', () => {
  //   spyOn(serviceDep2, 'get');
  //   serviceDep2.get();
  //   expect(serviceDep2.get).toHaveBeenCalled();
  // });

  it('should have method getScorecard(x) and do something', () => {
    spyOn(service, 'getScorecard');
    service.getScorecard('1');
    expect(service.getScorecard).toHaveBeenCalled();
  });

  it('should have method getScorecards() and do something', () => {
    spyOn(service, 'getScorecards');
    service.getScorecards();
    expect(service.getScorecards).toHaveBeenCalled();
  });

  it('should have method updateScorecard(scorecard) and do something', () => {
    spyOn(service, 'updateScorecard');
    service.updateScorecard(scorecard);
    expect(service.updateScorecard).toHaveBeenCalled();
  });

  it('should have method deleteScorecard(scorecard) and do something', () => {
      spyOn(service, 'deleteScorecard');
      service.deleteScorecard(scorecard);
      expect(service.deleteScorecard).toHaveBeenCalled();
  });

  it('should have method addScorecard(scorecard) and do something', () => {
        spyOn(service, 'addScorecard');
        service.addScorecard(scorecard);
        expect(service.addScorecard).toHaveBeenCalled();
  });
});

