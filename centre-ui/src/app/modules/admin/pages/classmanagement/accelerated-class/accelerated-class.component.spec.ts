import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AcceleratedClassComponent} from './accelerated-class.component';

describe('AcceleratedClassComponent', () => {
  let component: AcceleratedClassComponent;
  let fixture: ComponentFixture<AcceleratedClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceleratedClassComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcceleratedClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
