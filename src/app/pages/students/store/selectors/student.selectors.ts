import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsRootState } from '..';
import { STUDENTS_FEATURE_KEY } from '../constants';
import { studentFeature } from '../reducers/student.reducer';
import { studentListFeature } from '../reducers/students-list.reducer';

export const selectStudentsState =
  createFeatureSelector<StudentsRootState>(STUDENTS_FEATURE_KEY);

export const selectStudentsListState = createSelector(
  selectStudentsState,
  (state) => state[studentListFeature.name]
);

export const selectStudentState = createSelector(
  selectStudentsState,
  (state) => state[studentFeature.name]
);

export const selectStudent = createSelector(
  selectStudentState,
  ({ data }) => data
);

export const selectStudentLoading = createSelector(
  selectStudentState,
  ({ isLoading }) => isLoading
);

export const selectStudentSaving = createSelector(
  selectStudentState,
  ({ isSaving }) => isSaving
);
