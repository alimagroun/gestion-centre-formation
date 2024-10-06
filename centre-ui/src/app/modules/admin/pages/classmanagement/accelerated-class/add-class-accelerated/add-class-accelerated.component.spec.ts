import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassAcceleratedComponent } from './add-class-accelerated.component';

describe('AddClassAcceleratedComponent', () => {
  let component: AddClassAcceleratedComponent;
  let fixture: ComponentFixture<AddClassAcceleratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClassAcceleratedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassAcceleratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
