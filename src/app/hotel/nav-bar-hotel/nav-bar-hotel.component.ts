import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-hotel',
  templateUrl: './nav-bar-hotel.component.html',
  styleUrls: ['./nav-bar-hotel.component.css']
})
export class NavBarHotelComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onNewHotel() {
    this.router.navigateByUrl("/hotel/add-hotel");
  }

}
