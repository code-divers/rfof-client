import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CageEventlogComponent } from './cage-eventlog.component';

describe('CageEventlogComponent', () => {
  let component: CageEventlogComponent;
  let fixture: ComponentFixture<CageEventlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CageEventlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CageEventlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
