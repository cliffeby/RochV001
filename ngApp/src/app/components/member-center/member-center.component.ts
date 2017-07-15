import { MemberService } from '../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from "../../models/member";
@Component({
  selector: 'app-member-center',
  templateUrl: './member-center.component.html',
  styleUrls: ['./member-center.component.css'],
  providers: [MemberService]
})
export class MemberCenterComponent implements OnInit {
  selectedMember: Member;
  private hidenewMember: boolean = true;
  members: Array<Member>;
  constructor(private _memberService: MemberService) { }

  ngOnInit() {
    this._memberService.getMembers()
      .subscribe(resMemberData => this.members = resMemberData);
  }

  onSelectMember(member: any) {
    this.selectedMember = member;
    console.log(this.selectedMember);
  }

  newMember() {
    this.hidenewMember = false;
  }

  onSubmitAddMember(member: Member) {
    this._memberService.addMember(member)
      .subscribe(resNewMember => {
        this.members.push(resNewMember);
        this.hidenewMember = true;
        this.selectedMember = resNewMember;
      });

  }

  onUpdateMemberEvent(member: any) {
    this._memberService.updateMember(member)
      .subscribe(resUpdatedMember => member = resUpdatedMember);
    this.selectedMember = null;
  };

  onDeleteMemberEvent(member: any) {
    let memberArray = this.members;
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

}
