import { createActionGroup, props } from '@ngrx/store';
import { DashboardItem } from '../dashboard.types';

export const dashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Save Dashboard Item': props<{ item: DashboardItem}>(),
    'Add New Widget': props<{ item: DashboardItem }>(),
  }
});