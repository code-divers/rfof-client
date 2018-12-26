import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageLocationComponent } from './cage-location.component';

describe('CageLocationComponent', () => {
  let component: CageLocationComponent;
  let fixture: ComponentFixture<CageLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
