import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '@shared/services';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submited = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [
        Validators.required,
        this.passwordsMatchValidator,
      ]),
    });
  }

  get name(): AbstractControl {
    return this.registerForm.get('name')!;
  }

  get lastname(): AbstractControl {
    return this.registerForm.get('lastname')!;
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.registerForm.get('repeatPassword')!;
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  register(): void {
    this.submited = true;
    if (this.registerForm.invalid) {
      return;
    }
    const { name, lastname, email, password } = this.registerForm.getRawValue();

    this.authService
      .register(name, lastname, email, password)
      .subscribe((user) => {
        if (user) {
          this.toastService.show(
            'User registration successful ! Please Login.',
            {
              classname: 'bg-success text-light',
              delay: 3000,
            }
          );
          /**
           * redirect to login page
           */
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        }
      });
  }
}
