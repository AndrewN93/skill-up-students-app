import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JoinedStudentsWidgetState } from '../joined-students-widget.types';
import { featureName } from './joined-students-widget.reducer';

const selectStudentsWidgetFeature =
  createFeatureSelector<JoinedStudentsWidgetState>(featureName);
  
export const selectWidgets = createSelector(
  selectStudentsWidgetFeature,
  (state) => state.widgets
);

export const selectWidgetConfig = (id: string) => createSelector(
  selectStudentsWidgetFeature,
  selectWidgets,
  (_state, widgets) => widgets[id].config
);

export const selectWidgetLoading = (id: string) => createSelector(
  selectStudentsWidgetFeature,
  selectWidgets,
  (_state, widgets) => widgets[id].isLoading
);

export const selectWidgetData = (id: string) => createSelector(
  selectStudentsWidgetFeature,
  selectWidgets,
  (_state, widgets) => widgets[id].data
);

export const selectWidgetTimeRange = (id: string) => createSelector(
  selectStudentsWidgetFeature,
  selectWidgets,
  (_state, widgets) => widgets[id].config.timeRange
);
