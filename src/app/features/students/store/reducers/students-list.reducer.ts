import { createFeature, createReducer, on } from '@ngrx/store';
import { Student } from '../../components/student.types';
import { studentListActions } from '../actions/students-list.actions';

export interface StudentsListState {
  students: Student[];
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
        students: [...action.students],
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
