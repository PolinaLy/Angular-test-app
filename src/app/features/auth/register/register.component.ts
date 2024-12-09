import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  public registerForm !: FormGroup

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
      this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.email, this.password).subscribe(
        response => {
          this.message = 'Registration successful!';
          console.log(response);
        },
        error => {
          this.message = 'Registration failed!';
          console.error('Error response:', error);
          if (error.error) {
            console.error('Error details:', error.error);
          }
        }
      );
    } else {
      console.log('Форма недействительна');
    }
  }
}

