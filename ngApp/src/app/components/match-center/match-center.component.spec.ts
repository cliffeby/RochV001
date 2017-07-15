import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCenterComponent } from './match-center.component';

describe('MatchCenterComponent', () => {
  let component: MatchCenterComponent;
  let fixture: ComponentFixture<MatchCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
