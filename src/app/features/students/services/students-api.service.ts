import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../components/student.types';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
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
