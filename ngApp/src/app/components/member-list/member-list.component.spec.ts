import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberListComponent } from './member-list.component';
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "../../search.pipe";

describe('MemberListComponent', () => {
  let component: MemberListComponent;
  let fixture: ComponentFixture<MemberListComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListComponent, SearchFilterPipe ],
      imports: [FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
