import {
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { studentFeature, StudentState } from './student.reducer';
import {
  studentListFeature,
  StudentsListState,
} from './students-list.reducer';

export const featureKey = 'studentsModule';
export interface StudentsRootState {
  studentsList: StudentsListState;
  student: StudentState;
}

export const reducers = combineReducers({
  [studentListFeature.name]: studentListFeature.reducer,
  [studentFeature.name]: studentFeature.reducer,
});

export const selectStudentsState =
  createFeatureSelector<StudentsRootState>(featureKey);

export const selectStudentsListState = createSelector(
  selectStudentsState,
  (state) => state[studentListFeature.name]
);

export const selectStudentState = createSelector(
  selectStudentsState,
  (state) => state[studentFeature.name]
);

export const selectStudentsList = createSelector(
  selectStudentsListState,
  ({ students }) => students
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
