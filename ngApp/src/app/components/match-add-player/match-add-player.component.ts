import {Component, OnInit, EventEmitter} from '@angular/core';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-match-add-player',
  templateUrl: './match-add-player.component.html',
  styleUrls: ['./match-add-player.component.css'],
  inputs: ['match'],
  outputs: ['updateMatchEvent', 'deleteMatchEvent']
})
export class MatchAddPlayerComponent implements OnInit {
  match: any;
  private editTitle: boolean = false;
  private updateMatchEvent = new EventEmitter();
  private deleteMatchEvent = new EventEmitter();

  constructor(private _memberservice: MemberService) { }

  ngOnInit() {
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateMatch() {
    this.updateMatchEvent.emit(this.match);
  }

  deleteMatch() {
    this.deleteMatchEvent.emit(this.match);
  }

}
