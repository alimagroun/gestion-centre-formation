import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccreditedClassComponent} from './accredited-class.component';

describe('AccreditedClassComponent', () => {
  let component: AccreditedClassComponent;
  let fixture: ComponentFixture<AccreditedClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccreditedClassComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccreditedClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
