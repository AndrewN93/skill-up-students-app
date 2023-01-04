import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDashbord from './dashbord.reducer';

export const selectDashbordState = createFeatureSelector<fromDashbord.DashboardState>(
  fromDashbord.featureKey
);

export const selectDashbordItems = createSelector(
  selectDashbordState,
  (state) => state.items
)