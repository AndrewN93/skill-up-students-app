import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTimeService } from 'src/app/services/date-time.service';
import { WidgetConfig } from '../../joined-students-widget/joined-students-widget.types';
import { Student } from '../components/student.types';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(
    private http: HttpClient,
    private dateTimeService: DateTimeService,
  ) { }


  public resolveParamsFromConfig(config: WidgetConfig) {
    const ranges = this.dateTimeService.getRange(config.timeRange);
    const [from, to] = this.dateTimeService.convertToTimestamps(ranges);

    return {
      [config.timeKey + '_gte']: from,
      [config.timeKey + '_lte']: to,
    }
  }

  public getStudents(filter?: Record<string, string | number>): Observable<Student[]> {
    const params = new HttpParams(filter || {});

    return this.http.get<Student[]>('/api/students', { params });
  }

  public getSingleStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`/api/students/${id}`);
  }

  public postAddStudent(studentData: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>('/api/students', studentData);
  }

  public putEditStudent(id: string, studentData: Omit<Student, 'id'>): Observable<Student> {
    return this.http.put<Student>(`/api/students/${id}`, studentData);
  }

  public deleteStudent(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`/api/students/${id}`, {});
  }
}
