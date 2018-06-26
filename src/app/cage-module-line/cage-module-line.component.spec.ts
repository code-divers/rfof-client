import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageModuleLineComponent } from './cage-module-line.component';

describe('CageModuleLineComponent', () => {
  let component: CageModuleLineComponent;
  let fixture: ComponentFixture<CageModuleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageModuleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageModuleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
