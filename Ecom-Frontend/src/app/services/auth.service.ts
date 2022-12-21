import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API_2 = 'http://localhost:8080/api/users';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions).pipe();
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions).pipe();

  }

  checkAuthenticate() {
    return this.http.get(AUTH_API_2 + '/username').pipe();
  }
}
