import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CagePowerComponent } from './cage-power.component';

describe('CagePowerComponent', () => {
  let component: CagePowerComponent;
  let fixture: ComponentFixture<CagePowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagePowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CagePowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
