import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleConfiguratorComponent } from './module-configurator.component';

describe('ModuleConfiguratorComponent', () => {
  let component: ModuleConfiguratorComponent;
  let fixture: ComponentFixture<ModuleConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
