import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditedStudentsListComponent } from './accredited-students-list.component';

describe('AccreditedStudentsListComponent', () => {
  let component: AccreditedStudentsListComponent;
  let fixture: ComponentFixture<AccreditedStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccreditedStudentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditedStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
