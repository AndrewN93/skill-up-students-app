import { IStudent } from '../../components/student.types';
import { studentActions } from '../actions/student.actions';
import { studentFeature, studentInitialState } from './student.reducer';

describe('student reducer', () => {
  const { reducer } = studentFeature;
  it('should return the initial state', () => {
    const unknownAction = { type: 'unknown action' };

    const result = reducer(studentInitialState, unknownAction);
    expect(result).toBe(studentInitialState);
  });

  it('should handle loadStudent action and return brand new object', () => {
    const action = studentActions.loadStudent({id: 'test'})
    const result = reducer(studentInitialState, action);

    expect(result.isLoading).toBeTrue();
    expect(result).not.toBe(studentInitialState);
  });

  it('should handle loadStudentSuccess action and return brand new object', () => {
    const newStudentState: IStudent = {
      id: '123',
      name: 'Test123',
      startDate: 'startDate',
      ovarageScore: 0,
      isInTop: false,
      isActive: false
    }
    const action = studentActions.loadStudentSuccess({student: newStudentState})
    const result = reducer(studentInitialState, action);

    expect(result.data).toEqual(newStudentState);
    expect(result.data).not.toBe(newStudentState);
  });

  it('should handle saveStudent action and return brand new object', () => {
    const action = studentActions.saveStudent({ studentData: {
      name: 'Test123',
      startDate: 'startDate',
      ovarageScore: 0,
      isInTop: false,
      isActive: false
    }})
    const result = reducer(studentInitialState, action);

    expect(result.isSaving).toBeTrue();
    expect(result).not.toBe(studentInitialState);
  });

  it('should handle saveStudentSuccess action and return brand new object', () => {
    const prepearedState = {
      ...studentInitialState,
      student: {
        ame: 'Test123',
        startDate: 'startDate',
        ovarageScore: 0,
        isInTop: false,
        isActive: false
      },
      isSaving: true,
    }
    const action = studentActions.saveStudentSuccess();
    const result = reducer(prepearedState, action);

    expect(result.isSaving).toBeFalse();
    expect(result.data.name).toBe(studentInitialState.data.name);
    expect(result.data.id).toBe(studentInitialState.data.id);

    expect(result).not.toBe(prepearedState);
  });

  it('should handle saveStudentFailure action and return brand new object', () => {
    const prepearedState = {
      ...studentInitialState,
      student: {
        ame: 'Test123',
        startDate: 'startDate',
        ovarageScore: 0,
        isInTop: false,
        isActive: false
      },
      isSaving: true,
    }
    const testErorrMsg = 'test error message';
    const action = studentActions.saveStudentFailure({ error: testErorrMsg });
    const result = reducer(prepearedState, action);

    expect(result.isSaving).toBeFalse();
    expect(result.data.name).toBe(studentInitialState.data.name);
    expect(result.data.id).toBe(studentInitialState.data.id);

    expect(result.savingError).toBe(testErorrMsg);
    
    expect(result).not.toBe(prepearedState);
  });
});
