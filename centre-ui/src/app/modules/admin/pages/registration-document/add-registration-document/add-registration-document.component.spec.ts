import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddRegistrationDocumentComponent} from './add-registration-document.component';

describe('AddRegistrationDocumentComponent', () => {
  let component: AddRegistrationDocumentComponent;
  let fixture: ComponentFixture<AddRegistrationDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRegistrationDocumentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddRegistrationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
