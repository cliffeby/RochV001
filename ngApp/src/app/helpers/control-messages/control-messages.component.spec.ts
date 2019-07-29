import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from '../../services/validation.service';

// Mock Validation Service
export class MockValidationService {
  getValidatorErrorMessage() {
  };
}

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ValidationService],
      declarations: [ControlMessagesComponent],
      providers: [
        { provide: ValidationService, useclass: MockValidationService }
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let _validationservice = new MockValidationService();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});
