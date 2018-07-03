import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageVisualComponent } from './cage-visual.component';

describe('CageVisualComponent', () => {
  let component: CageVisualComponent;
  let fixture: ComponentFixture<CageVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
