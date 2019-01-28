import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertJobComponent } from './insert-job.component';

describe('InsertJobComponent', () => {
  let component: InsertJobComponent;
  let fixture: ComponentFixture<InsertJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
