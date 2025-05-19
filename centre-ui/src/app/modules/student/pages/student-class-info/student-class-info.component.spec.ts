import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassInfoComponent } from './student-class-info.component';

describe('StudentClassInfoComponent', () => {
  let component: StudentClassInfoComponent;
  let fixture: ComponentFixture<StudentClassInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentClassInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
