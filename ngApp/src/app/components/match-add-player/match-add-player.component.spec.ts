// import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatchAddPlayerComponent } from './match-add-player.component';
// import {AuthService} from "../../services/auth.service";
// import {AuthHttp} from "angular2-jwt";
// import {MatchService} from "../../services/match.service";
// import {RouterTestingModule} from "@angular/router/testing";


// // Mock our Auth service
// export class MockAuthService {
//   isAuthenticated() {
//   };
//   logout() {
//   };
// }
// export class MockAuthHttp {
//   get(){}
// };


// fdescribe('MatchADDPlayer: My: TestBed', () => {
//   let service: MatchService;
//   let myServiceDependency: AuthHttp;
//   let component: MatchAddPlayerComponent;
//   let fixture: ComponentFixture<MatchAddPlayerComponent>;

//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       providers: [
//         MatchService,
//         {provide: AuthService, useClass: MockAuthService},
//         {provide: AuthHttp, useClass: MockAuthHttp}
//       ]
//     })
//       .compileComponents();

//     service = TestBed.get(MatchService);
//     myServiceDependency = TestBed.get(AuthHttp);
//   });
//   beforeEach(async() => {
//     fixture = TestBed.createComponent(MatchAddPlayerComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create a service instance', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create an injected instance', inject([MatchService], (injectedService: MatchService) => {
//     expect(injectedService).toBeDefined();
//   }));


//   // describe('MatchAddPlayerComponent', () => {
//   //   let component: MatchAddPlayerComponent;
//   //   let fixture: ComponentFixture<MatchAddPlayerComponent>;

//     // beforeEach(async() => {
//     //   fixture = TestBed.createComponent(MatchAddPlayerComponent);
//     //   component = fixture.componentInstance;
//     //   fixture.detectChanges();
//     // });


//     it('should be created', () => {
//       expect(fixture).toBeTruthy();
//     });
//   });



