import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { JoinedStudentsWidgetModule } from '../joined-students-widget/joined-students-widget.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    JoinedStudentsWidgetModule,
  ]
})
export class DashboardModule { }
