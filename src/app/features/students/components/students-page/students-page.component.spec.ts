import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { studentActions } from '../../store/actions/student.actions';
import { studentListActions } from '../../store/actions/students-list.actions';
import { selectStudentsList } from '../../store/selectors/students-list.selectors';

import { StudentsPageComponent } from './students-page.component';

const mockStudents = [
  {
    name: 'andrii',
    startDate: '2022-12-18T22:00:00.000Z',
    ovarageScore: 4,
    isInTop: false,
    isActive: false,
    id: '1',
  },
  {
    name: 'jdfasf',
    startDate: '0122-12-31T21:57:56.000Z',
    ovarageScore: 123,
    isInTop: true,
    isActive: true,
    id: '2',
  },
];

describe('StudentsPageComponent', () => {
  let component: StudentsPageComponent;
  let fixture: ComponentFixture<StudentsPageComponent>;
  let store: MockStore;

  afterEach(() => {
    store?.resetSelectors();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsPageComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectStudentsList,
              value: mockStudents,
            },
          ],
        }),
        { provide: MatDialog, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StudentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.dispatch = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display right amount of students fetched from selector', () => {
    expect(component.dataSource.length).toBe(mockStudents.length);
  });

  it('should dispatch loadStudents action on initialization of component', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      studentListActions.loadStudents()
    );
  });

  it('should dispatch deleteStudent action with an id of student on deleteStudent call', () => {
    const [firstStudent] = mockStudents;
    const { id } = firstStudent;
    component.deleteStudent(id);
    expect(store.dispatch).toHaveBeenCalledWith(
      studentActions.deleteStudent({ id })
    );
  });
});
