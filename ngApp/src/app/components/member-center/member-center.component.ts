import { MemberService } from '../../services/member.service';
import { ScoreService } from '../../services/score.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Member } from '../../models/member';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-member-center',
  templateUrl: './member-center.component.html',
  styleUrls: ['./member-center.component.css'],
  providers: [MemberService]
})

export class MemberCenterComponent implements OnInit {
  selectedMember: Member;
  public canCreate: boolean;
  public canUpdate: boolean;
  public canDelete: boolean;
  private hidenewMember = true;
  members: Array<Member>;

  constructor(private _memberService: MemberService,
              private auth: AuthService) {}

  ngOnInit() {
    this._memberService.getMembers()
      .subscribe(resMemberData => this.members = resMemberData);
    this.canCreate = this.auth.userHasScopes(['create:member']);
    this.canUpdate = this.auth.userHasScopes(['update:member']);
    this.canDelete = this.auth.userHasScopes(['remove:member']);
    console.log('canCreate',this.canCreate, this.canUpdate, this.canDelete);
  }

  onSelectMember(member: any) {
    this.selectedMember = member;
    console.log(this.selectedMember);
  }

  addMember() {
    this.hidenewMember = false;
  }

  onSubmitAddMember(member: Member) {
    this._memberService.addMember(member)
      .subscribe(resNewMember => {
        this.members.push(resNewMember);
        this.hidenewMember = true;
        this.selectedMember = null;
      });
    // TODO - Is Pipe better to force sort
    this._memberService.getMembers()
      .subscribe(resMemberData => this.members = resMemberData);
  }

  onUpdateMemberEvent(member: any) {
    this._memberService.updateMember(member)
      .subscribe(resUpdatedMember => member = resUpdatedMember);
    this.selectedMember = null;
   // TODO - Is Pipe better to force sort
    this._memberService.getMembers()
      .subscribe(resMemberData => this.members = resMemberData);
  };

  onDeleteMemberEvent(member: any) {
    const memberArray = this.members;
    this._memberService.deleteMember(member)
      .subscribe(resDeletedMember => {
        for (let i = 0; i < memberArray.length; i++) {
          if (memberArray[i]._id === member._id) {
            memberArray.splice(i, 1);
          }
        }
      });
    this.selectedMember = null;
  };
  onNotifyClicked(): void {
    this.selectedMember = null;
  }

}
