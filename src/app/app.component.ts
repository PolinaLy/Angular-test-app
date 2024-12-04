// import { RouterOutlet } from '@angular/router';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from './features/shared/data.service';
import { User, Resource } from './features/shared/models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { UsersComponent } from './features/users/users.component';


@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [UsersComponent]
})

export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  resources$: Observable<Resource[]>;

  constructor(private dataService: DataService) {
    this.users$ = this.dataService.getUsers();
    this.resources$ = this.dataService.getResources();
  }

  ngOnInit(): void {
   }
}
