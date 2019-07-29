import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

let service: ValidationService;
describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    // imports: [HttpClientTestingModule],
    providers: [ValidationService]
  })
    .compileComponents()
);
  //service = TestBed.get(ValidationService);


  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [ScorecardService, {
  //       provide: AuthService, useClass: MockAuthService
  //     }, {
  //         provide: AuthHttp, useClass: MockAuthHttp
  //       }]
  //   });
  //   service = TestBed.get(ScorecardService);


  it('should be created', () => {
    const service: ValidationService = TestBed.get(ValidationService);
    expect(service).toBeTruthy();
  });
});
