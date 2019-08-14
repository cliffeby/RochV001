import { Component, OnInit, EventEmitter, NgModule, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { Scorecard } from '../../models/scorecard';
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@NgModule({
  imports: [
    MaterialModule, MatTableDataSource, MatSort
  ]
})

@Component({
  selector: 'scorecard-list',
  templateUrl: 'scorecard-list.component.html',
  styleUrls: ['scorecard-list.component.css'],
  outputs: ['SelectScorecard', 'CopyScorecardEvent', 'AddScorecardEvent', 'DeleteScorecardEvent']
})
export class ScorecardListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() scorecards:Scorecard[];
  public SelectScorecard = new EventEmitter();
  public CopyScorecardEvent = new EventEmitter();
  public AddScorecardEvent = new EventEmitter();
  public DeleteScorecardEvent = new EventEmitter();

  public displayedColumns = ['name', 'rating', 'slope' ,'details', 'copy', 'delete'];
  public dataSource:MatTableDataSource<Scorecard>;

  @ViewChild( MatSort, {static:true} ) sort: MatSort;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Scorecard>(this.scorecards)
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSelect(scard: Scorecard) {
    this.SelectScorecard.emit(scard);
  }

  onCopyAddScorecard(scard: Scorecard){
    this.CopyScorecardEvent.emit(scard);
  }

  addScorecard() {
    this.AddScorecardEvent.emit();
  }

  deleteScorecard(scard: Scorecard){
    this.DeleteScorecardEvent.emit(scard);
  }
}
