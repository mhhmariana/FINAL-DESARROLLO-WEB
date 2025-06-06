import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {

  public email: string = '';
  public password: string = '';

  public showError: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit() {
    var session = sessionStorage.getItem('token');
  
    if (session !== null && session.trim() !== '') {
      this.router.navigate(['/contacts']);
    }
  }

  public validatecredentials() {
    var url ="http://localhost:6545/api/login";

    var headers= new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    var body = {
      email : this.email,
      password : this.password
    }

    this.http.post(url, body, { headers }).subscribe({
      next: (resp: any) => {
        var token = resp.token;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', this.email);
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.showError = true; 
      }
    });

}
}
