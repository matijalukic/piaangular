import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFairComponent } from './single-fair.component';

describe('SingleFairComponent', () => {
  let component: SingleFairComponent;
  let fixture: ComponentFixture<SingleFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
