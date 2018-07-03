import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSwitchComponent } from './group-switch.component';

describe('GroupSwitchComponent', () => {
  let component: GroupSwitchComponent;
  let fixture: ComponentFixture<GroupSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
