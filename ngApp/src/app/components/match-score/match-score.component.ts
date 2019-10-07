import { Component, OnInit, EventEmitter, NgModule, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { Match } from "../../models/match";
import { Datasource } from "../../models/datasource";
import { Member } from "../../models/member";
import { ScorecardService } from "../../services/scorecard.service"
import { MemberService } from "../../services/member.service";
import { MatchService } from "../../services/match.service";
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@NgModule({
  imports: [
    MaterialModule,
    MatSort,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ValidationService
  ]
})
@Component({
  selector: "match-score",
  templateUrl: "./match-score.component.html",
  styleUrls: ["./match-score.component.css"],
  outputs: ["updateMatchEvent", "submitAddMatchEvent", "SubmitScoreEvent"]
})
export class MatchScoreComponent implements OnInit, OnChanges {
  @Input() DS: any;
  @Input("match") match: Match;

  selected: any;
  private datasource: Datasource[] = [];
  hidenewMatch: boolean;
  scoreMatch: boolean;
  scorecards: Array<Scorecard>;
  members: Array<Member>;
  private updateMatchEvent = new EventEmitter();
  private SubmitScoreEvent = new EventEmitter();
  private submitAddMatchEvent = new EventEmitter();
  public matchScoreForm: FormGroup;
  public displayedColumns = ["playerNames", "playershCap"];
  public dataSource: MatTableDataSource<any>;
  public dataSource1: MatTableDataSource<any>;

  public displayedColumns1: string[] = ["position", "name", "weight", "symbol"];

  p_DATA:any = [
    {playerNames: "Crew Cut", playersHCap: 15},
    {playerNames: "London Catcher", playersHCap: 16},
    {playerNames: "Teddy Baker", playersHCap: 14}
  ]

  constructor(
    private _scorecardservice: ScorecardService,
    private _memberservice: MemberService,
    private _matchservice: MatchService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.matchScoreForm = fb.group({
      playerNames: "",
      hCap: "",
      todaysScore: ""
    });
  }

  ngOnInit() {
      this._matchservice.dsArray.subscribe((DS) => {
      console.log("MatchCenter SCORE DS", DS);
      // this.DS = DS;
      // this.onSelectMatch(match);
    // this.DS.push({playerNames: "Crew Cut212", playersHCap: 15});
    DS = [...DS, ...[{ playerNames: "Crew Cut228", playersHCap: 15 }]];
    this.dataSource = new MatTableDataSource(DS);
    this.cd.detectChanges();
    this.DS = DS;
        })
    // this.cd.markForCheck();
    // this.cd.detectChanges();
    // this.match = {
    //   ...this.match,
    //   name: this.match.name + "."
    // };
    // console.log("matchscorengOnInit1", this.match, this.dataSource);
    // this.dataSource = new MatTableDataSource(this.DS);
    // // this.datasourceInit(this.match);
    console.log("matchscorengOnInit2", this.match, this.dataSource);

      }
  ngOnChanges() {

  }
  onAddPlayer(){
    // this.DS.push({ playerNames: "ADDon"});
    // this.DS = [...this.DS,...[ { playerNames: "Crew Cut21", playersHCap: 99 }]];
     this.dataSource = new MatTableDataSource(this.DS);
               }

}
