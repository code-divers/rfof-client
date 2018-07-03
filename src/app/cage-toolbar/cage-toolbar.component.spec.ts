import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageToolbarComponent } from './cage-toolbar.component';

describe('CageToolbarComponent', () => {
  let component: CageToolbarComponent;
  let fixture: ComponentFixture<CageToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
