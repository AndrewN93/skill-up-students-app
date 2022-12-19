import { StudentsRootState } from '..';
import { selectStudent, selectStudentLoading, selectStudentSaving } from './student.selectors';

fdescribe('Selectors', () => {
  const initialState: Pick<StudentsRootState, 'student'> = {
    student: {
      data: {
        name: 'Test12',
        startDate: '2022-12-22T22:00:00.000Z',
        ovarageScore: 123,
        isInTop: true,
        isActive: true,
        id: '3',
      },
      isSaving: true,
      isLoading: true,
      savingError: 'some error happened',
    },
  };

  it('should select the student from store correctly', () => {
    const result = selectStudent.projector(initialState.student);
    expect(result.name).toEqual('Test12');
    expect(result.id).toEqual('3');
  });

  it('should select the student loading state from store correctly', () => {
    const result = selectStudentLoading.projector(initialState.student);
    expect(result).toBeTrue();
  });

  it('should select the student saving state from store correctly', () => {
    const result = selectStudentSaving.projector(initialState.student);
    expect(result).toBeTrue();
  });

});
