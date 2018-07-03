import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleVisualComponent } from './module-visual.component';

describe('ModuleVisualComponent', () => {
  let component: ModuleVisualComponent;
  let fixture: ComponentFixture<ModuleVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
