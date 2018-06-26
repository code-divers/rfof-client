import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageInfoComponent } from './cage-info.component';

describe('CageInfoComponent', () => {
  let component: CageInfoComponent;
  let fixture: ComponentFixture<CageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
