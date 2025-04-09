import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPcComponent } from './menu-pc.component';

describe('MenuPcComponent', () => {
  let component: MenuPcComponent;
  let fixture: ComponentFixture<MenuPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
