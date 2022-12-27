import { createReducer, on } from '@ngrx/store';
import {
  JoinedStudentsWidgetState,
  WidgetConfig,
} from '../joined-students-widget.types';
import { studentWidgetActions } from './joined-students-widget.actions';

export const featureName = 'studentsWidget';

export const joinedStudentsWidgetInitialState: JoinedStudentsWidgetState = {
  widgets: {
    // 'some-random-id-generated': {
    //   config: new WidgetConfig(),
    //   isLoading: false,
    //   data: [],
    // },
    // 'some-another-random-id-generated': {
    //   config: new WidgetConfig(),
    //   isLoading: false,
    //   data: [],
    // }
  }
};

export const studetnsWidgetReducer = createReducer(
  joinedStudentsWidgetInitialState,
  on(studentWidgetActions.updateConfig, (state, { config, id }): JoinedStudentsWidgetState => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: { ...state.widgets[id], config: { ...state.widgets[id].config, ...config } },
    }
  })),
  on(studentWidgetActions.loadData, (state, { id }): JoinedStudentsWidgetState => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: { ...state.widgets[id], isLoading: true },
    }
  })),
  on(studentWidgetActions.checkInitializedWidget, (state, { id }): JoinedStudentsWidgetState => {
    if (state.widgets[id]) {
      return state;
    }
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: {
          config: new WidgetConfig(),
          isLoading: false,
          data: [],
        }
      }
    }
  }),
  on(studentWidgetActions.loadDataSuccess, (state, { widgetData, id }): JoinedStudentsWidgetState => {
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: { ...state.widgets[id], isLoading: false, data: [...widgetData] },
      }
    }
  }),
);
