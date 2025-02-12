import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AcceleratedStudentsListComponent} from './accelerated-students-list.component';

describe('AcceleratedStudentsListComponent', () => {
  let component: AcceleratedStudentsListComponent;
  let fixture: ComponentFixture<AcceleratedStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceleratedStudentsListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcceleratedStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
