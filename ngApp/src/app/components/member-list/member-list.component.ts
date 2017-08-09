import { Component, OnInit, EventEmitter } from '@angular/core';
import { Member } from '../../models/member';
import { SearchFilterPipe} from '../../search.pipe';

@Component({
  selector: 'member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  inputs: ['members'],
  outputs: ['SelectMember']
})
export class MemberListComponent implements OnInit {
  public SelectMember = new EventEmitter();
  private queryString: string;
  constructor() { }

  ngOnInit() {
    this.queryString = "";
  }

  onSelect(mem: Member) {
    this.SelectMember.emit(mem);
  }

}
