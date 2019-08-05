import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AAASanityComponent } from './aaa-sanity.component';
import {DataService} from "./shared/data.service";

describe('AAASanityComponent', () => {
  let component: AAASanityComponent;
  let fixture: ComponentFixture<AAASanityComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AAASanityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AAASanityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('2 should equal 2',(() => {
    expect(2).toEqual(2);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`component.title property should equal 'Trying Again'`, async(() => {
    const fixture = TestBed.createComponent(AAASanityComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Trying Again');
  }));

  it(`should render text 'And Again' in an <p> tag`, async(() => {
    const fixture = TestBed.createComponent(AAASanityComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('And Again');
  }));

  it('component method onInitYearstoString should exist', () => {
      expect(component.onInitYardsString).toBeTruthy;
    })

  it('component method onInitYearstoString return a string1', () => {
    expect(component.onInitYardsString("")).toEqual(['YARDS', '', '0', '0', '0']);
  })

  it('component method onInitYearstoString return a string2', () => {
    expect(component.onInitYardsString("1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2"))
    .toEqual(['YARDS', '1', '1', '1', '1', '1', '1', '1', '1', '1', '9', '2', '2', '2', '2', '2', '2', '2', '2', '2', '18', '27']);
  })

  });





describe ('Sanity Test - Access a Service', ()=> {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AAASanityComponent],
      providers: [DataService]
    })
      .compileComponents();
  }));

  it('Should fetch data using constructor\'s DataService', async(() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));

  it('Should fail to fetch data using constructor\'s DataService when not async', (() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let component = fixture.componentInstance;
      expect(component.data).toBe(undefined);
  }));
});

export class Mock1DataService{
  getDetails(){
    return Promise.resolve('Data1');
  }
}

describe ('Sanity Tests Mock DataService Async', ()=> {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AAASanityComponent],
    });
    TestBed.overrideComponent(AAASanityComponent, {
      set: {providers: [
        {provide: DataService, useClass: Mock1DataService}
      ]
      }})
      .compileComponents();
  });

  it('Should fetch data using constructor\'s injected MockDataService', async(() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data1');
    });
  }));

  it('Should fetch data using SpyOn', async(() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('DataSpy'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('DataSpy');
    });
  }));

  it('MockDataService should replace DataService', async(() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let dataService = fixture.debugElement.injector.get(DataService);
    dataService.getDetails().then((data) =>{
      expect(data).toBe('Data1');
    })
  }));
});

describe ('Sanity Tests using fakeAsync and DataService', ()=> {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AAASanityComponent]
    });
  });

  it('Should fetch data using SpyOn', fakeAsync(() =>{
    let fixture = TestBed.createComponent(AAASanityComponent);
    let component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toBe('Data');
  }));
});
