import { combineReducers } from '@ngrx/store';
import { STUDENTS_FEATURE_KEY } from './constants';
import { studentFeature, StudentState } from './reducers/student.reducer';
import {
  studentListFeature,
  StudentsListState,
} from './reducers/students-list.reducer';

export const featureKey = STUDENTS_FEATURE_KEY;

export interface StudentsRootState {
  studentsList: StudentsListState;
  student: StudentState;
}

export const reducers = combineReducers({
  [studentListFeature.name]: studentListFeature.reducer,
  [studentFeature.name]: studentFeature.reducer,
});
