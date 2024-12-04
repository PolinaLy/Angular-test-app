import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [CommonModule]
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input() user: User | null = null;
  private routeSubscription: Subscription | undefined;
  private users: User[] = [];


  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      this.usersService.getUser(id).subscribe(user => this.user = user);
      }
    )
  }

  updateUser() {
    this.usersService.updateUser(this.user!).subscribe(
      updatedUser => {
        this.user = updatedUser; // Update the displayed user
        console.log('User updated successfully:', updatedUser);
      },
      error => console.error('Error updating user:', error)
    );
  }

  deleteUser(id: number) {
      this.usersService.deleteUser(id).subscribe({
          next: () => {
              console.log("User deleted!");
          },
          error: (error) => {
              console.error("Error deleting user:", error);
          }
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
