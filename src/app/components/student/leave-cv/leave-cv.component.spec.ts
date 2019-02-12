import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCVComponent } from './leave-cv.component';

describe('LeaveCVComponent', () => {
  let component: LeaveCVComponent;
  let fixture: ComponentFixture<LeaveCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
