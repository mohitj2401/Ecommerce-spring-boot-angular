import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecom-Frontend';
  loggedIn: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    this.authService.isLoggedIn.subscribe(data => this.loggedIn = data);

    this.authService.checkAuthenticate().subscribe({
      next: data => {
        if (data["id"] != null) {
          this.loggedIn = true;
          this.authService.isLoggedIn.next(true);
        } else {
          this.loggedIn = false;
          this.authService.isLoggedIn.next(false);
        }
      },
      error: err => {


        this.loggedIn = false;
        this.authService.isLoggedIn.next(false);
      }
    });

  }
  logout() {
    window.sessionStorage.clear();
    this.authService.isLoggedIn.next(false);
    this.loggedIn = false;
  }
}
