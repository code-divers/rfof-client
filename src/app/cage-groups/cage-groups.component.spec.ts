import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageGroupsComponent } from './cage-groups.component';

describe('CageGroupsComponent', () => {
  let component: CageGroupsComponent;
  let fixture: ComponentFixture<CageGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
