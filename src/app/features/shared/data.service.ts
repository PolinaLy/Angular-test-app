import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { User, Resource } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private usersUrl = 'https://reqres.in/api/users?page=2';
  private resourcesUrl = 'https://reqres.in/api/unknown';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.usersUrl).pipe(
      map(response => response.data as User[]),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<any>(this.resourcesUrl).pipe(
      map(response => response.data as Resource[]),
      catchError(this.handleError<Resource[]>('getResources', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log to console for debugging
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
