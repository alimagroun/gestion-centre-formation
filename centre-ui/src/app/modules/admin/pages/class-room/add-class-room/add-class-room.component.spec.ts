import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassRoomComponent } from './add-class-room.component';

describe('AddClassRoomComponent', () => {
  let component: AddClassRoomComponent;
  let fixture: ComponentFixture<AddClassRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClassRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClassRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
