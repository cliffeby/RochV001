import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './aaChild-sanity.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;
  let de: DebugElement;
  let button: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    button = de.query(By.css('button'));
  });
  describe('change', () => {
    it('should emit when the button is clicked', () => {
      spyOn(component.change, 'emit');
      button.nativeElement.click();
      expect(component.change.emit).toHaveBeenCalled();
    });
  });
  describe('changeOnClick', () => {
    it('should emit when the button is clicked', () => {
      spyOn(component.change, 'emit');
      component.onClick();
      expect(component.change.emit).toHaveBeenCalledWith(1);
    });
  });
});

