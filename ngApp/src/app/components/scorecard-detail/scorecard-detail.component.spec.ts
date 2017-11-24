import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { ScorecardDetailComponent } from './scorecard-detail.component';

xdescribe('ScorecardDetailComponent', () => {
  let component: ScorecardDetailComponent;
  let fixture: ComponentFixture<ScorecardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardDetailComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});
