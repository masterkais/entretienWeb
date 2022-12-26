import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarHotelComponent } from './nav-bar-hotel.component';

describe('NavBarHotelComponent', () => {
  let component: NavBarHotelComponent;
  let fixture: ComponentFixture<NavBarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
