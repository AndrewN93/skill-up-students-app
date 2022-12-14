import { createFeature, createReducer, on } from '@ngrx/store';
import { Student } from '../../components/student.types';
import { studentActions } from '../actions/student.actions';

export const studentFeatureKey = 'student';

export interface StudentState {
  data: Student;
  isSaving: boolean;
  isLoading: boolean;
  savingError: string;
}

export const studentInitialState: StudentState = {
  data:  {
    id: '',
    name: '',
    startDate: '',
    ovarageScore: 0,
    isInTop: false,
    isActive: false
  },
  isSaving: false,
  isLoading: false,
  savingError: '',
};

export const studentFeature = createFeature({
  name: 'student',
  reducer: createReducer(
    studentInitialState,
    on(
      studentActions.loadStudent,
      (state): StudentState => ({ ...state, isLoading: true })
    ),
    on(
      studentActions.loadStudentSuccess,
      (state, { student }): StudentState => ({ ...state, data: {...student}, isLoading: false })
    ),
    on(
      studentActions.saveStudent,
      (state): StudentState => ({ ...state, isSaving: true, savingError: '' })
    ),
    on(
      studentActions.saveStudentSuccess,
      (state): StudentState => ({ ...state, data: {...studentInitialState.data}, isSaving: false })
    ),
    on(
      studentActions.saveStudentFailure,
      (state, { error }): StudentState => ({ ...state, isSaving: false, savingError: error })
    ),
  ),
});
