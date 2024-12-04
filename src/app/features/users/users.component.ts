
import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../shared/models/user.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  unknownData: any[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getUnknown();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = users; // Update dataSource.data
        console.log("Users:", this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  getUnknown(): void {
     this.usersService.getUnknown().subscribe(data => this.unknownData = data);
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        console.log(`User with ID ${id} deleted successfully`);
        this.getUsers(); // Refresh the user list after deletion
      },
      error: (error) => {
        console.error(`Error deleting user with ID ${id}:`, error);

      }
    });
  }
}
