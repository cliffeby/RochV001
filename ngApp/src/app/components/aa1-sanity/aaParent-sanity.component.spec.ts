import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Aa1SanityComponent } from '../aa1-sanity/aaParent-sanity.component';
import { CounterComponent } from './aaChild-sanity.component';

describe('aaParentSanityComponent', () => {
  let fixture: ComponentFixture<Aa1SanityComponent>;
  let component: Aa1SanityComponent;
  let de: DebugElement;
  let nameEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aa1SanityComponent, CounterComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Aa1SanityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameEl = fixture.debugElement.query(By.css('[id=btnUpdate]'));
    de = fixture.debugElement;
   });


  describe('onChange', () => {
    it('should be called with whatever the counter change event emits', () => {
      spyOn(component, 'onChange');
      const counter = de.query(By.directive(CounterComponent));
      const cmp = counter.componentInstance;
      cmp.change.emit(1);
      expect(component.onChange).toHaveBeenCalledWith(1);
    });
  });
  describe('onChange', () => {
    it('should increment the count by the amount provided', () => {
      component.count = 2;
      component.onChange(2);
      expect(component.count).toEqual(4);
    });
  });
});
