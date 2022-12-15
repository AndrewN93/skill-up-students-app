import { createFeature, createReducer, on } from '@ngrx/store';
import { IStudent } from '../components/student.types';
import { studentListActions } from './students.actions';

export const studentListFeatureKey = 'students-list';

export interface StudentsListState {
  entities: IStudent[];
  isLoading: boolean;
  loaded: boolean;
  error: string;
}

export const studentListInitialState: StudentsListState = {
  entities: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export const studentListFeature = createFeature({
  name: 'studentsList',
  reducer: createReducer(
    studentListInitialState,
    on(
      studentListActions.loadStudents,
      (state): StudentsListState => ({ ...state, isLoading: true })
    ),
    on(
      studentListActions.loadStudentsSuccess,
      (state, action): StudentsListState => ({
        ...state,
        entities: action.students,
        isLoading: false,
        loaded: true,
      })
    ),
    on(
      studentListActions.loadStudentsFailure,
      (state, {error}): StudentsListState => ({
        ...state,
        entities: [],
        isLoading: false,
        loaded: true,
        error
      })
    )
  ),
});
