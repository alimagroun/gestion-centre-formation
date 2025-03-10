import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFormationComponent} from './add-formation.component';

describe('AddFormationComponent', () => {
  let component: AddFormationComponent;
  let fixture: ComponentFixture<AddFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
