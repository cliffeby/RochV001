import { Component, OnInit, Input, EventEmitter, Pipe } from '@angular/core';
import { Member } from '../../models/member';


@Component({
  selector: 'member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  inputs: ['members', 'create'],
  outputs: ['SelectMember']
})
export class MemberListComponent implements OnInit {
  public SelectMember = new EventEmitter();
  private queryString: string;
  @Input()
  public create: boolean;

  constructor() { }

  ngOnInit() {
    this.queryString = "";
    console.log('BACK from List ngOnInit', this.create);
  }

  onSelect(mem: Member) {
    this.SelectMember.emit(mem);
  }

}
