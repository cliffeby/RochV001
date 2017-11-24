import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBlockComponent } from './member-block.component';

xdescribe('MemberBlockComponent', () => {
  let component: MemberBlockComponent;
  let fixture: ComponentFixture<MemberBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
