import { Router } from '@angular/router';
import { CustomValidators } from './../../validators/custom-validators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customer!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private router: Router) { }

  get username() { return this.customer.get('username'); }
  get password() { return this.customer.get('password'); }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl("/profile");
    }
    this.customer = this.formBuilder.group({
      username: ['', [
        Validators.required,

        CustomValidators.notOnlyWhiteSpace
      ]],
      password: ['', [
        Validators.required,

        CustomValidators.notOnlyWhiteSpace
      ]],
    });


  }

  onSubmit(): void {
    if (this.customer.invalid) {
      this.customer.markAllAsTouched();
      return;
    }
    const { username, password } = this.customer.value;

    this.authService.login(username, password).subscribe({
      next: data => {


        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        this.authService.isLoggedIn.next(true);
        this.router.navigateByUrl("/profile");
      },
      error: err => {
        console.log(err);

        // this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.authService.isLoggedIn.next(false);

      }
    });
  }


}
