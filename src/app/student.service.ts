import { Injectable } from '@angular/core';
import { CollegeData, CollegeDataNoID } from './CollegeData';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl= "http://localhost:3000/details";
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getStudents(): Observable<CollegeData[]> {
    return this.http.get<CollegeData[]>(this.studentUrl)
    .pipe(
      tap(_ => console.log('fetched students')),
      catchError(this.handleError<CollegeData[]>('getStudents', []))
    );
  }

  getStudent(id: number): Observable<CollegeData> {
  const url = `${this.studentUrl}/${id}`;
  return this.http.get<CollegeData>(url).pipe(
    tap(_ => console.log(`fetched student id=${id}`)),
    catchError(this.handleError<CollegeData>(`getStudent id=${id}`))
  );
}

  
deleteStudent(id: number): Observable<CollegeData> {
  const url = `${this.studentUrl}/${id}`;
  const operation = 'delete'
  return this.http.delete<CollegeData>(url, this.httpOptions).pipe(
    tap(_ => console.log(`deleted hero id=${id}`)),
    catchError(this.handleError<CollegeData>('deleteHero'))
  );
}

updateStudent(student: CollegeData): Observable<any> {
  const url = `${this.studentUrl}/${student.id}`;
  console.log(url);
  return this.http.put(url, student, this.httpOptions).pipe(
    tap(_ => console.log(`updated student id=${student.id}`)),
    catchError(this.handleError<any>('updateStudent'))
  );
}

addStudent(student:CollegeDataNoID ): Observable<CollegeDataNoID> {
  console.log(student)
  let temp=this.http.post<CollegeDataNoID>(this.studentUrl, student, this.httpOptions).pipe(
    catchError(this.handleError<CollegeDataNoID>('addStudent'))
  );
  console.log(temp);
  return temp;
}
  constructor(
    private http: HttpClient
  ) { }
}
