import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleConfigDialogComponent } from './module-config-dialog.component';

describe('ModuleConfigDialogComponent', () => {
  let component: ModuleConfigDialogComponent;
  let fixture: ComponentFixture<ModuleConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
