import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class UserDetailComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  user: User | null = null;
  error: string | null = null;

  private routeSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
    });
  }

  ngOnInit(): void {
    this.routeSubscription.add(this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      this.usersService.getUser(id).subscribe({
        next: user => {
          this.user = user;
          if (user) {
            this.userForm.patchValue(user);
          } else {
            this.error = `User with ID ${id} not found`;
          }
        },
        error: err => {
          this.error = `Error fetching user: ${err.message}`;
        }
      })
    }
    ))
  }

  editUser() {
    if (this.userForm.invalid) {
        this.error = 'Please fill out all required fields correctly.';
        return;
    }

    const updatedUser = { ...this.userForm.value };
    this.usersService.editUser(updatedUser).subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err) => this.error = `Error updating user: ${err.message}`
    });
}

  ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
  }
}
