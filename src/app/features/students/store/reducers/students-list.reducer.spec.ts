import { studentListActions } from '../actions/students-list.actions';
import {
  studentListFeature,
  studentListInitialState,
} from './students-list.reducer';

describe('student reducer', () => {
  const { reducer } = studentListFeature;
  it('should return the initial state', () => {
    const unknownAction = { type: 'unknown action' };

    const result = reducer(studentListInitialState, unknownAction);
    expect(result).toBe(studentListInitialState);
  });

  it('should handle loadStudents action and return brand new object', () => {
    const action = studentListActions.loadStudents();
    const result = reducer(studentListInitialState, action);

    expect(result.isLoading).toBeTrue();
    expect(result).not.toBe(studentListInitialState);
  });

  it('should handle loadStudentsSuccess action and return brand new object', () => {
    const action = studentListActions.loadStudentsSuccess({
      students: [
        {
          id: '123',
          name: 'Test123',
          startDate: 'startDate',
          ovarageScore: 0,
          isInTop: false,
          isActive: false,
        },
      ],
    });
    const prepearedState = {
      ...studentListInitialState,
      isLoading: true,
    };
    const result = reducer(prepearedState, action);

    expect(result.isLoading).not.toBeTrue();
    expect(result.students.length).toBe(1);
    expect(result).not.toBe(prepearedState);
  });

  it('should handle loadStudentsFailure action and return brand new object', () => {
    const testErrorMsg = 'test errror message';
    const prepearedState = {
      ...studentListInitialState,
      isLoading: true,
    };
    
    const action = studentListActions.loadStudentsFailure({ error: testErrorMsg });
    const result = reducer(prepearedState, action);

    expect(result.isLoading).not.toBeTrue();
    expect(result.students.length).toBe(0);
    expect(result.error).toBe(testErrorMsg);

    expect(result).not.toBe(prepearedState);
  });
});
