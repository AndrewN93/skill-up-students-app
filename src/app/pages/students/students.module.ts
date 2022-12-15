import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  StudentsPageComponent,
  StudentDataFormModalComponent,
} from './components';
import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { studentListFeature } from './store/students.reducers';

@NgModule({
  declarations: [StudentsPageComponent, StudentDataFormModalComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(studentListFeature.name, studentListFeature.reducer),
  ],
})
export class StudentsModule {}
