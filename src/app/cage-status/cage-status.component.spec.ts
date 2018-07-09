import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageStatusComponent } from './cage-status.component';

describe('CageStatusComponent', () => {
  let component: CageStatusComponent;
  let fixture: ComponentFixture<CageStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
