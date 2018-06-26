import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageGroupComponent } from './cage-group.component';

describe('CageGroupComponent', () => {
  let component: CageGroupComponent;
  let fixture: ComponentFixture<CageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
