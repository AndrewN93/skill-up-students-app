import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromStudetnsWidgetReducer from './state';
import { JoinedStudentsWidgetEffects } from './state/joined-students-widget.effects';
import { JoinedStudentsWidgetComponent } from './components/joined-students-widget.component';

@NgModule({
  declarations: [JoinedStudentsWidgetComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    EffectsModule.forFeature(JoinedStudentsWidgetEffects),
    StoreModule.forFeature(fromStudetnsWidgetReducer.featureName, fromStudetnsWidgetReducer.studetnsWidgetReducer),
  ],
  exports: [JoinedStudentsWidgetComponent]
})
export class JoinedStudentsWidgetModule { }
