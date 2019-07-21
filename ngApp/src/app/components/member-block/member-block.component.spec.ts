import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { MemberBlockComponent } from './member-block.component';
import {SearchFilterPipe} from "../../search.pipe";
import {Score} from '../../models/score';
import {Match} from '../../models/match';
import {ScoreService} from '../../services/score.service';
import {AuthService} from "../../services/auth.service";
import {MemberService} from "../../services/member.service";
import {AuthHttp} from "angular2-jwt";

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


describe('MemberBlockComponent', () => {
  let component: MemberBlockComponent;
  let fixture: ComponentFixture<MemberBlockComponent>;
  // let match: Array<Match>;
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBlockComponent, SearchFilterPipe],
      imports: [FormsModule],
      providers: [ ScoreService,
        {provide: MemberService, useClass: MockMemberService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    })
    .compileComponents();
  });

  beforeEach(async() => {

    fixture = TestBed.createComponent(MemberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
