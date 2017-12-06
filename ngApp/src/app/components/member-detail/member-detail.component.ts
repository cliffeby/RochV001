import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms"


@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  inputs: ['member', 'create', 'update', 'delete'],
  outputs: ['updateMemberEvent', 'deleteMemberEvent', 'notify']
})
export class MemberDetailComponent implements OnInit {
  member: any;
  fbGroup: FormGroup;
  private editTitle: boolean = false;
  public updateMemberEvent = new EventEmitter();
  public deleteMemberEvent = new EventEmitter();
  public notify = new EventEmitter();

  constructor() {
  }

  ngOnInit() {}

  onTitleClick() {
    this.editTitle = true;
  }

  updateMember() {
    this.updateMemberEvent.emit(this.member);
  }

  deleteMember() {
    this.deleteMemberEvent.emit(this.member);
  }
  back(){
   this.notify.emit();
  }

}
