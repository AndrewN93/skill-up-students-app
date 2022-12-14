import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './components';
import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from 'src/app/material';

@NgModule({
  declarations: [
    StudentsPageComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule
  ]
})
export class StudentsModule { }
