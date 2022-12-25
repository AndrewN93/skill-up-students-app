import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JoinedStudentsWidgetState } from '../joined-students-widget.types';
import { featureName } from './joined-students-widget.reducer';

const selectStudentsWidgetFeature =
  createFeatureSelector<JoinedStudentsWidgetState>(featureName);

export const selectWidgetConfig = createSelector(
  selectStudentsWidgetFeature,
  (state) => state.config
);

export const selectWidgetLoading = createSelector(
  selectStudentsWidgetFeature,
  (state) => state.isLoading
);

export const selectWidgetData = createSelector(
  selectStudentsWidgetFeature,
  (state) => state.data
);

export const selectWidgetTimeRange = createSelector(
  selectStudentsWidgetFeature,
  (state) => state.config.timeRange
);
