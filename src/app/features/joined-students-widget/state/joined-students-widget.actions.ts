import { createActionGroup, props } from '@ngrx/store';
import { StudentsWidgetData, WidgetConfig } from '../joined-students-widget.types';

export const studentWidgetActions = createActionGroup({
  source: 'Student Widget',
  events: {
    'Update Config': props<{ id: string; config: Partial<WidgetConfig> }>(),
    'Load Data': props<{ id: string }>(),
    'Load Data Success': props<{ id: string; widgetData: StudentsWidgetData[] }>(),
    'Check Initialized Widget': props<{ id: string }>(),
  },
});
