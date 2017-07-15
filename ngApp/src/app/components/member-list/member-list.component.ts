import { Component, OnInit, EventEmitter } from '@angular/core';
import { Member } from '../../models/member';

@Component({
  selector: 'member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  inputs: ['members'],
  outputs: ['SelectMember']
})
export class MemberListComponent implements OnInit {
  public SelectMember = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(mtc: Member) {
    this.SelectMember.emit(mtc);
  }

}
