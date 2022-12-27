import { createReducer, on } from '@ngrx/store';
import { DashboardItem } from '../dashboard.types';
import { dashboardActions } from './dashbord.actions';

export const featureKey = 'dashbord';

export interface DashboardState {
  items: DashboardItem[];
}

export const initialState: DashboardState = {
  items: [{
    cols: 6, rows: 5, y: 0, x: 0,
    id: 'some-random-id-generated',
    type: 'StudentsWidget'
  },
  {
    cols: 6, rows: 5, y: 0, x: 6,
    id: 'some-another-random-id-generated',
    type: 'StudentsWidget'
  },]
} as DashboardState;

export const reducer = createReducer(
  initialState,

  on(dashboardActions.addNewWidget, (state, { item }): DashboardState => {
    return {
      ...state,
      items: [...state.items, item],
    }
  }),

  on(
    dashboardActions.saveDashboardItem,
    (state, { item }): DashboardState => ({
      ...state,
      items: state.items.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      }),
    })
  )
);
