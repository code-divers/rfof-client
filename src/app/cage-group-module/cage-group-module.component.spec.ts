import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageGroupModuleComponent } from './cage-group-module.component';

describe('CageGroupModuleComponent', () => {
  let component: CageGroupModuleComponent;
  let fixture: ComponentFixture<CageGroupModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageGroupModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageGroupModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
