import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLedComponent } from './module-led.component';

describe('ModuleLedComponent', () => {
  let component: ModuleLedComponent;
  let fixture: ComponentFixture<ModuleLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
