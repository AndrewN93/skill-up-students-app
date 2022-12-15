import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudent } from '../components/student.types';

export const studentListActions = createActionGroup({
  source: 'Student List',
  events: {
    'Load Students': emptyProps(),
    'Load Students Failure': props<{ error: string }>(),
    'Load Students Success': props<{ students: IStudent[] }>(),
  },
});
