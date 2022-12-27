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
import { localStorageSync } from 'ngrx-store-localstorage';
export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['widgets'], rehydrate: true })(reducer);
}
@NgModule({
  declarations: [JoinedStudentsWidgetComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    EffectsModule.forFeature(JoinedStudentsWidgetEffects),
    StoreModule.forFeature(
      fromStudetnsWidgetReducer.featureName,
      fromStudetnsWidgetReducer.studetnsWidgetReducer,
      {
        initialState:
          fromStudetnsWidgetReducer.joinedStudentsWidgetInitialState,
        metaReducers: [localStorageSyncReducer],
      }
    ),
  ],
  exports: [JoinedStudentsWidgetComponent],
})
export class JoinedStudentsWidgetModule {}
