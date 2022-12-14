import { Component } from '@angular/core';
import { IStudent } from '../student.types';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  displayedColumns: string[] = ['name', 'startDate', 'overageMark', 'isInTop', 'isActive'];
  dataSource: IStudent[] = Array.from({length: 10}, (_, ndx) => ({
    id: String(ndx),
    name: 'Test student' + ndx,
    startDate: new Date().toDateString(),
    overageMark: 5,
    isInTop: false,
    isActive: false
  }));

  constructor() {
    console.log(this.dataSource);
  }

}
