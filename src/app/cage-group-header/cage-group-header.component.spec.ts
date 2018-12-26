import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageGroupHeaderComponent } from './cage-group-header.component';

describe('CageGroupHeaderComponent', () => {
  let component: CageGroupHeaderComponent;
  let fixture: ComponentFixture<CageGroupHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageGroupHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageGroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
