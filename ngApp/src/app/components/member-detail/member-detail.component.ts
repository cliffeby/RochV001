import { Component, OnInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  inputs: ['member'],
  outputs: ['updateMemberEvent', 'deleteMemberEvent']
})
export class MemberDetailComponent implements OnInit {
  member: any;

  private editTitle: boolean = false;
  private updateMemberEvent = new EventEmitter();
  private deleteMemberEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateMember() {

    this.updateMemberEvent.emit(this.member);
  }

  deleteMember() {
    this.deleteMemberEvent.emit(this.member);
  }

}
