import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>
      <button (click)="onClick()">1</button>
    </div>
    <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="input" id = "btnUpdate" (click)="updateScorecard()" class="btn btn-primary">Update</button>
      <button type="button" (click)="deleteScorecard()" class="btn btn-danger">Delete</button>
    </div>
  </div>
  `
})
export class CounterComponent {
  @Output() change = new EventEmitter<number>();

  onClick() {
    this.change.emit(1);
  }
}