import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(30)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(30)
  ]);
  con_password = new FormControl('', [
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

  signup() {
    if (
      this.name.valid &&
      this.password.valid &&
      this.email.valid &&
      this.con_password.valid
    ) {
      if (this.password.value === this.con_password.value) {
        const user = {
          name: this.name.value,
          email: this.email.value,
          password: this.password.value
        };

        this.auth.Register(user).subscribe(
          data => {
            if (data['success'] === false) {
              return this.openSnackBar(data['msg']);
            }

            this.openSnackBar('Account created Successfully..!');
            this.router.navigate(['/login']);
          },
          err => {
            this.openSnackBar('Account created Successfully..!');
          }
        );
      }
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', { duration: 3000 });
  }
}
