import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAddPlayerComponent } from './match-add-player.component';

describe('MatchAddPlayerComponent', () => {
  let component: MatchAddPlayerComponent;
  let fixture: ComponentFixture<MatchAddPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAddPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
