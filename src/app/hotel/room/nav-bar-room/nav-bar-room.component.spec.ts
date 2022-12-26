import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarRoomComponent } from './nav-bar-room.component';

describe('NavBarRoomComponent', () => {
  let component: NavBarRoomComponent;
  let fixture: ComponentFixture<NavBarRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
