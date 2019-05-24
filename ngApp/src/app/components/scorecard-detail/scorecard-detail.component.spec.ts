import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { ScorecardDetailComponent } from './scorecard-detail.component';
import { Scorecard } from '../../models/scorecard';
import { DebugElement, Component} from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({selector: 'host-for-test', template:''}) class HostComponent{}

describe('ScorecardDetailComponent', () => {
  let component: ScorecardDetailComponent;
  let fixture: ComponentFixture<ScorecardDetailComponent>;
  let hostTestComponent: HostComponent;
  let hostTestFixture: ComponentFixture<HostComponent>;
  const getSDCElement = () : HTMLElement => hostTestFixture.debugElement.query(By.css('.btn')) ? fixture.debugElement.query(By.css('.btn')).nativeElement : null;

  let nameEl: DebugElement;
  let ratingEl: DebugElement;
  let slopeEL: DebugElement;
  let parEl: DebugElement;
  let hcapEl: DebugElement;
  let yardsEl: DebugElement;
  let updateEl: DebugElement;

  // function createHostComponent( template : string ) : ComponentFixture<HostComponent> {
  //   TestBed.overrideComponent(HostComponent, { set: { template: template } });
  //   const fixture = TestBed.createComponent(HostComponent);
  //   fixture.detectChanges();
  //   return fixture as ComponentFixture<HostComponent>;
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardDetailComponent , HostComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(ScorecardDetailComponent);
    component = fixture.componentInstance;
    nameEl = fixture.debugElement.query(By.css('input[id=btnUpdate]'));

  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });

  it('Entering course, rating, slope,...', () => {
    // component.enabled = true;
    fixture.detectChanges();
    expect(updateEl.nativeElement.disabled).toBeFalsy();
    // let scorecard: Scorecard;
    // nameEl.nativeElement.value = "Blue Monster"; (1)
    // ratingEl.nativeElement.value = "72.2";

    // hostComponent.onUpdateScorecardEvent.subscribe((value) => scorecard = value);

    // updateEl.triggerEventHandler('click', null); (2)

    // expect(scorecard.name).toBe("Blue Monster");
    // expect(scorecard.rating).toBe("72.2");
  });
});
