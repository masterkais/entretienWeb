import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MatBadgeModule } from '@angular/material/badge';

Ng2GoogleChartsModule
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatTooltipModule,
    NgChartsModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    MatBadgeModule,
  ],
  declarations: [

  ],
  exports : [
    MatBadgeModule
  ]
})
export class AdminLayoutModule {}