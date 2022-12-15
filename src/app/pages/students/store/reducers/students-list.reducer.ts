import { createFeature, createReducer, on } from '@ngrx/store';
import { IStudent } from '../../components/student.types';
import { studentListActions } from '../actions/students-list.actions';

export const studentListFeatureKey = 'students-list';

export interface StudentsListState {
  students: IStudent[];
  isLoading: boolean;
  loaded: boolean;
  error: string;
}

export const studentListInitialState: StudentsListState = {
  students: [],
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
        students: action.students,
        isLoading: false,
        loaded: true,
        error: '',
      })
    ),
    on(
      studentListActions.loadStudentsFailure,
      (state, { error }): StudentsListState => ({
        ...state,
        students: [],
        isLoading: false,
        loaded: true,
        error,
      })
    )
  ),
});

