import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../components/student.types';

@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>('/api/students');
  }

  public getSingleStudent(id: string): Observable<IStudent> {
    return this.http.get<IStudent>(`/api/students/${id}`);
  }

  public postAddStudent(studentData: Omit<IStudent, 'id'>): Observable<IStudent> {
    return this.http.post<IStudent>('/api/students', studentData);
  }

  public putEditStudent(id: string, studentData: Omit<IStudent, 'id'>): Observable<IStudent> {
    return this.http.put<IStudent>(`/api/students/${id}`, studentData);
  }

  public deleteStudent(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`/api/students/${id}`, {});
  }
}
