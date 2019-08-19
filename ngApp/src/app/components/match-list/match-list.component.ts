import { Component, OnInit, EventEmitter, NgModule, Input, ViewChild } from '@angular/core';
import { Match } from '../../models/match';
import { CommonModule } from "@angular/common"
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
// import { match } from 'minimatch';

@Component({
  selector: 'match-list',
  templateUrl: 'match-list.component.html',
  styleUrls: ['match-list.component.css'],
  outputs: ['SelectMatch', 'AddMatchEvent','ScoreMatchEvent','DeleteMatchEvent']
})

  @NgModule({
    imports: [
      MaterialModule, MatTableDataSource, MatSort, CommonModule
    ]
  })
export class MatchListComponent implements OnInit {
  @Input() matches: Match[];
  public SelectMatch = new EventEmitter();
  public AddMatchEvent = new EventEmitter();
  public DeleteMatchEvent = new EventEmitter();
  public ScoreMatchEvent = new EventEmitter();
  private queryString: string;
  public displayedColumns = ['name', 'datePlayed', 'scName', 'details', 'pair', 'scores', 'delete'];

  public dataSource: MatTableDataSource<Match>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.queryString = "";
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Match>(this.matches)
  }

  ngAfterViewInit(): void {
    // undefined console.log("matchesOnInit", this.matches)
    this.dataSource.sort = this.sort;
  }
  onSelectMatch(mtc: Match) {
    this.SelectMatch.emit(mtc);
  }

  scoreMatch(mtc: Match){
    this.ScoreMatchEvent.emit(mtc);
  }

  deleteMatch(mtc:Match){
    console.log("Emit delete match")
    this.DeleteMatchEvent.emit(mtc);
  }
}
