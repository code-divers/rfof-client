import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CagePwrComComponent } from './cage-pwr-com.component';

describe('CagePwrComComponent', () => {
  let component: CagePwrComComponent;
  let fixture: ComponentFixture<CagePwrComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CagePwrComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CagePwrComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
