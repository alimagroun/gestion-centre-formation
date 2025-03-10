import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DomainComponent} from './domain.component';

describe('DomainComponent', () => {
  let component: DomainComponent;
  let fixture: ComponentFixture<DomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
