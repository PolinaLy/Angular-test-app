
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { User, Resource } from '../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [CommonModule]
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  resources: Resource[] = [];

  private usersSubscription: Subscription = new Subscription();

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.getResources();
    this.usersSubscription = this.usersService.users$.subscribe(users => {
      this.users = users;
  });
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  getResources(): void {
     this.usersService.getResources().subscribe(data => this.resources = data);
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        //имитация удаления
        this.users = this.users.filter(user => {
          return user.id != id;
        })
        console.log(`User with ID ${id} deleted successfully`);
      },
      error: (error) => {
        console.error(`Error deleting user with ID ${id}:`, error);

      }
    });
  }

  viewUserDetail(id: number) {
    this.router.navigate(['/user', id]);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
