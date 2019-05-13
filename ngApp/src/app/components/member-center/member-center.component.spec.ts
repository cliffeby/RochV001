import {TestBed, inject, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {AuthService} from "../../services/auth.service";
import {MemberService} from "../../services/member.service";
import {AuthHttp} from "angular2-jwt";
import {MemberCenterComponent} from "./member-center.component";
import {MemberDetailComponent} from "../member-detail/member-detail.component";
import {MemberListComponent} from "../member-list/member-list.component";
import {SearchFilterPipe} from "../../search.pipe";
import {FormsModule} from "@angular/forms";

// Mock our Auth service
//@formatter:off
export class MockMemberService {
  getMembers() {}};
export class MockAuthService {
  isAuthenticated() {};
  logout() {};};
export class MockAuthHttp {
  get() {};};
//@formatter:on

describe('MemberComponent and Service: My: TestBed', () => {
  let service: MemberService;
  let myServiceDependency: AuthHttp;
  let component: MemberCenterComponent;
  let fixture: ComponentFixture<MemberCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberCenterComponent, MemberDetailComponent, MemberListComponent, SearchFilterPipe],
      imports: [FormsModule],
      providers: [ MemberService,
        // {provide: MemberService, useClass: MockMemberService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
      .compileComponents();
  }));
  // it('should do something', fakeAsync(() => {
  //   fixture = TestBed.createComponent(MemberCenterComponent);
  //   component = fixture.componentInstance; // BannerComponent test instance
  //   service = fixture.debugElement.injector.get(MemberService);
  //   console.log('SERVICEEEDDDDDDD', service);
  //   spyOn(MemberService, 'getMembers')
  //     .and.returnValue((Promise.resolve('Data')));
  //   fixture.detectChanges();
  //   tick();
  //   expect(component.members).toBe('Data');
  //   expect(myServiceDependency.get).toHaveBeenCalled();
  // }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(MemberCenterComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    service = TestBed.get(MemberService);
    myServiceDependency = TestBed.get(AuthHttp);
  });

  it('should create a service instance', () => {
    expect(service).toBeDefined();
  });
  it('should create a service instance with getMembers()', () => {
    expect(service.getMembers).toBeDefined();
  });

  it('should create an injected instance', inject([MemberService], (injectedService: MemberService) => {
    expect(injectedService).toBeDefined();
  }));

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });
});

describe('UpdateMemberEvent', () => {
  it('should emit ANY on MemberDetailClick', (done) => {
    let child = new MemberDetailComponent();
    child.member = 'ANY';
    child.updateMemberEvent.subscribe(g => {
      expect(g).toEqual('ANY');
      done();
    });
    child.updateMember();
  });
});

describe('DeleteMemberEvent', () => {
  it('should emit ANY on MemberDetailClick', (done) => {
    let child = new MemberDetailComponent();
    child.member = 'ANY';
    child.deleteMemberEvent.subscribe(g => {
      expect(g).toEqual('ANY');
      done();
    });
    child.deleteMember();
  });
});
