import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Register(user) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/register', user, {
      headers: header
    });
  }

  Login(user) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/login', user, {
      headers: header
    });
  }

  isLoggedIn() {
    return localStorage.length > 0 ? true : false;
  }
}
