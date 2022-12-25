import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StudentsWidgetData, WidgetConfig } from '../joined-students-widget.types';

export const studentWidgetActions = createActionGroup({
  source: 'Student Widget',
  events: {
    'Update Config': props<{ config: Partial<WidgetConfig> }>(),
    'Load Data': emptyProps(),
    'Load Data Success': props<{widgetData: StudentsWidgetData[]}>(),
  },
});
