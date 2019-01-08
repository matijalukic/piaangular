import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFairComponent } from './new-fair.component';

describe('NewFairComponent', () => {
  let component: NewFairComponent;
  let fixture: ComponentFixture<NewFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
