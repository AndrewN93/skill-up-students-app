import { Component, OnInit } from '@angular/core';
import { StudentsApiService } from '../../services/students-api.service';
import { IStudent } from '../student.types';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'startDate',
    'overageMark',
    'isInTop',
    'isActive',
  ];
  dataSource: IStudent[] = [];
  isLoading = false;

  constructor(private studentsApiService: StudentsApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = false;
    this.studentsApiService.getStudents().subscribe({
      next: (result) => {
        this.dataSource = result;
        this.isLoading = true;
      },
      error: () => (this.isLoading = false),
    });
  }
}
