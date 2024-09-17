import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDocumentComponent } from './registration-document.component';

describe('RegistrationDocumentComponent', () => {
  let component: RegistrationDocumentComponent;
  let fixture: ComponentFixture<RegistrationDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
