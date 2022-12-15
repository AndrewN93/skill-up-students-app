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
  (state) => {
    console.log(state[studentListFeature.name], studentListFeature.name);
    return state[studentListFeature.name];
  }
);

export const selectStudentState = createSelector(
  selectStudentsState,
  (state) => {
    return state[studentFeature.name];
  }
);

export const selectStudentsList = createSelector(
  selectStudentsListState,
  ({ students }) => students
);
