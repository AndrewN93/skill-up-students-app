import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { JoinedStudentsWidgetModule } from '../joined-students-widget/joined-students-widget.module';
import { EffectsModule } from '@ngrx/effects';
import { DashbordEffects } from './store/dashbord.effects';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store/dashbord.reducer';
import { GridsterModule } from 'angular-gridster2';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DynamicModule } from 'ng-dynamic-component';
import { StudentCountryDougnatWidgetModule } from '../student-country-dougnat-widget/student-country-dougnat-widget.module';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['items'], rehydrate: true })(reducer);
}
@NgModule({
  declarations: [DashboardPageComponent],
  providers: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    JoinedStudentsWidgetModule,
    GridsterModule,
    StoreModule.forFeature(fromDashboard.featureKey, fromDashboard.reducer, {
      initialState: fromDashboard.initialState,
      metaReducers: [localStorageSyncReducer],
    }),
    EffectsModule.forFeature([DashbordEffects]),
    DynamicModule,
    StudentCountryDougnatWidgetModule,
  ],
})
export class DashboardModule {}
