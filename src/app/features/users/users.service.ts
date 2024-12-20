import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Resource, User } from '../shared/models/user.model';
import { map, catchError} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class UsersService {
  private usersUrl = 'https://reqres.in/api/users?page=2';
  private resourcesUrl = 'https://reqres.in/api/unknown';
  private usersSubject = new BehaviorSubject<User[]>([]); // Your data store
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(users => this.usersSubject.next(users));
  }

  editUser(updatedUser: User): Observable<User[]> {
    return new Observable(observer => {
      const users = this.usersSubject.value;
      const index = users.findIndex(user => user.id === updatedUser.id);
      if (index > -1) {
        const updatedUsers = [...users];
        console.log('updatedUser',updatedUser)
        updatedUsers[index] = { ...updatedUsers[index], ...updatedUser };
        this.usersSubject.next(updatedUsers);
        observer.next();
        observer.complete();
      } else {
        observer.error(new Error(`User with ID ${updatedUser.id} not found`));
      }
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.usersUrl).pipe(
      map(response => response.data),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<any>(this.resourcesUrl).pipe(
      map((response: any) => response.data),
      catchError(this.handleError<Resource[]>('getResources', []))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data),
      catchError(this.handleError<User>('getUser'))
    );
  }

  // editUser(user: User): Observable<User> {
  //   const url = `https://reqres.in/api/users/${user.id}`;
  //   return this.http.put<any>(url, user).pipe(
  //     map(response => response.data),
  //     catchError(this.handleError<User>('updateUser'))
  //   );
  // }

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

