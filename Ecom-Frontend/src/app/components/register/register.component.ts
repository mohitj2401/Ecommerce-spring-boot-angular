import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { CustomValidators } from './../../validators/custom-validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  customer!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) { }

  get email() { return this.customer.get('email'); }
  get username() { return this.customer.get('username'); }
  get password() { return this.customer.get('password'); }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {


      this.router.navigateByUrl("/profile");
    }
    this.customer = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.notOnlyWhiteSpace
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        CustomValidators.notOnlyWhiteSpace
      ]],
      email: ['', [
        Validators.required,
        // Validators.minLength(2),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]]
    });
  }


  onSubmit(): void {
    if (this.customer.invalid) {
      this.customer.markAllAsTouched();
      return;
    }


    const { username, email, password } = this.customer.value;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
