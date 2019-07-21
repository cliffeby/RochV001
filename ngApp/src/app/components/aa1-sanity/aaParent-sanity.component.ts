import { Component, OnInit } from '@angular/core';

@Component({
  selector: '',
  templateUrl: './aa1-sanity.component.html',
  styleUrls: ['./aa1-sanity.component.css']
})
export class Aa1SanityComponent {
  count = 0;

  onChange(event: number): void {
    this.count += event;
  }
  // onChange(event: number): void {
  //   this.count += event;
  // }
}
