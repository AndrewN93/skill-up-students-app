import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentsRootState } from '..';
import { STUDENTS_FEATURE_KEY } from '../constants';
import { studentListFeature } from '../reducers/students-list.reducer';

export const selectStudentsState =
  createFeatureSelector<StudentsRootState>(STUDENTS_FEATURE_KEY);

export const selectStudentsListState = createSelector(
  selectStudentsState,
  (state) => state[studentListFeature.name]
);

export const selectStudentsList = createSelector(
  selectStudentsListState,
  ({ students }) => students
);
