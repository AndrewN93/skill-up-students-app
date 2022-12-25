import { createReducer, on } from '@ngrx/store';
import {
  JoinedStudentsWidgetState,
  WidgetConfig,
} from '../joined-students-widget.types';
import { studentWidgetActions } from './joined-students-widget.actions';

export const featureName = 'studentsWidget';

export const joinedStudentsWidgetInitialState: JoinedStudentsWidgetState = {
  config: new WidgetConfig(),
  isLoading: false,
  data: [],
};

export const studetnsWidgetReducer = createReducer(
  joinedStudentsWidgetInitialState,
  on(studentWidgetActions.updateConfig, (state, { config }): JoinedStudentsWidgetState => ({
    ...state,
    config: { ...state.config, ...config },
  })),
  on(studentWidgetActions.loadData, (state): JoinedStudentsWidgetState => ({
    ...state,
    isLoading: true,
  })),
  on(studentWidgetActions.loadDataSuccess, (state, { widgetData }): JoinedStudentsWidgetState => ({
    ...state,
    isLoading: false,
    data: [...widgetData ]
  })),
);
