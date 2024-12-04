import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../shared/models/user.model';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class UsersService {
  private usersUrl = 'https://reqres.in/api/users?page=2';
  private unknownUrl = 'https://reqres.in/api/unknown';

  constructor(private http: HttpClient) {}


  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.usersUrl).pipe(
      tap((response: any) => console.log('Raw API Response:', response)),
      map(response => response.data),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUnknown(): Observable<User[]> {
    return this.http.get<any>(this.unknownUrl).pipe(

      map((response: any) => response.data),
      catchError(this.handleError<User[]>('getUnknown', []))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data),
      catchError(this.handleError<User>('getUser'))
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `https://reqres.in/api/users/${user.id}`;
    return this.http.put<any>(url, user).pipe(
      map(response => response.data),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>('deleteUser'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

