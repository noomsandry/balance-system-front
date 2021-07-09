import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submited = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toatService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.submited = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toatService.show(
          'Login failed - Email or password did not match.',
          {
            classname: 'bg-danger text-light',
            delay: 3000,
          }
        );
      }
    );
  }
}
