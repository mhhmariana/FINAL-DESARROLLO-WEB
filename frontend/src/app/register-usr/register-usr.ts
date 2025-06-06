import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-usr',
  imports: [FormsModule, NgIf],
  templateUrl: './register-usr.html',
  styleUrls: ['./register-usr.css'],
  standalone: true,
})
export class Register_usr {
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  public registerUser() {
    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    var url = 'http://localhost:6545/api/users';

    var headers= new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    var body = {
      email : this.email,
      password : this.password,
    };

    this.http.post(url, body, { headers: headers }).subscribe({
      next: (resp: any) => {
        this.showSuccess = true;
        this.showError = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (error) => {
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = error.error?.message || 'Error al registrar usuario';
      }
      });


  }
}