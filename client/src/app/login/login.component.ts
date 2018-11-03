import { SnackbarComponent } from './../snackbar/snackbar.component';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(30)
  ]);

  constructor(
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    if (this.email.valid && this.password.valid) {
      const user = {
        email: this.email.value,
        password: this.password.value
      };
      this.auth.Login(user).subscribe(
        data => {
          if (data['success'] === false) {
            return this.openSnackBar(data['msg']);
          }
          console.log(data['token']);
          console.log(data['user']);
          const userString = JSON.stringify(data['user']);
          localStorage.setItem('token', data['token']);
          localStorage.setItem('user', userString);
          this.openSnackBar('Logged IN');
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.openSnackBar('Provide correct informations');
        }
      );
    } else {
      this.openSnackBar('Provide correct informations');
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', { duration: 3000 });
  }
}
