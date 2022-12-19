import { StudentsRootState } from '..';
import { selectStudentsList } from './students-list.selectors';

fdescribe('Selectors', () => {
  const initialState: Pick<StudentsRootState, 'studentsList'> = {
    studentsList: {
      students: [
        {
          name: 'Test1',
          startDate: '2022-12-22T22:00:00.000Z',
          ovarageScore: 1,
          isInTop: true,
          isActive: true,
          id: '1',
        },
        {
          name: 'Test2',
          startDate: '2022-12-22T22:00:00.000Z',
          ovarageScore: 2,
          isInTop: true,
          isActive: false,
          id: '2',
        },
      ],
      isLoading: true,
      loaded: false,
      error: 'some string is here',
    },
  };

  it('should select the students list correnctly', () => {
    const result = selectStudentsList.projector(initialState.studentsList);
    expect(result.length).toEqual(2);
  });

});
