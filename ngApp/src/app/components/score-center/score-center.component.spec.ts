import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCenterComponent } from './score-center.component';

describe('ScoreCenterComponent', () => {
  let component: ScoreCenterComponent;
  let fixture: ComponentFixture<ScoreCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
