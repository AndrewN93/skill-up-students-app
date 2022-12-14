import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './components';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsPageComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
  ]
})
export class StudentsModule { }
