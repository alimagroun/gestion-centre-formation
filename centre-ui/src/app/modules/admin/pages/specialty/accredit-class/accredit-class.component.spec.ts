import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditClassComponent } from './accredit-class.component';

describe('AccreditClassComponent', () => {
  let component: AccreditClassComponent;
  let fixture: ComponentFixture<AccreditClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccreditClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
