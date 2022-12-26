import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    
}
export const ROUTES: RouteInfo[] = [
    { path: '/user', title: 'Utilisateurs',  icon:'group', class: '' },
    { path: '/group', title: 'Groups',  icon:'group_work', class: '' },
    { path: '/category', title: 'Categories',  icon:'branding_watermark', class: '' },
    { path: '/hotel', title: 'Hotels',  icon:'group', class: '' },
    { path: '/image', title: 'Images',  icon:'event_available', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
