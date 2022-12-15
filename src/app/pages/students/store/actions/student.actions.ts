import { createActionGroup, props } from '@ngrx/store';
import { IStudent } from '../../components/student.types';

export const studentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Student': props<{ id: string }>(),
    'Load Student Success': props<{ student: IStudent }>(),

    'Save Student': props<{ studentData: Omit<IStudent, 'id'>, id?: string }>(),
    'Save Student Success': props<{ student: IStudent }>(),
    'Save Student Failure': props<{ error: string }>(),
  
    'Delete Student': props<{ id: string }>(),
    'Delete Student Success': props<{ id: string }>(),
    'Delete Student Failure': props<{ error: string }>(),
  },
});
