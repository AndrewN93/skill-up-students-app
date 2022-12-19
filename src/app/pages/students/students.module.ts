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
import { EffectsModule } from '@ngrx/effects';
import { StudentsListEffects } from './store/effects/students-list.effects';
import { StudentEffects } from './store/effects/student.effects';
import * as fromStudents from './store';

@NgModule({
  declarations: [StudentsPageComponent, StudentDataFormModalComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(StudentsListEffects, StudentEffects),
    StoreModule.forFeature(fromStudents.featureKey, fromStudents.reducers),
  ],
})
export class StudentsModule {}
