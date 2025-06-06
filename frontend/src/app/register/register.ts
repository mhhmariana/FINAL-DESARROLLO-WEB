import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
})
export class Register {
  public nombre: string = '';
  public apellidos: string = '';
  public telefono: string = '';
  public celular: string = '';
  public email: string = '';
  

  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

 
  public registerContact() {
    if (!this.nombre.trim() || 
        !this.apellidos.trim() || 
        !this.telefono.trim() || 
        !this.celular.trim() || 
        !this.email.trim()
      ){
        this.showError = true;
        this.errorMessage = 'Todos los campos son obligatorios';
        this.showSuccess = false;
        return;
    }

    var url = 'http://localhost:6545/api/contact';
    var token = sessionStorage.getItem('token');
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    var body = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      telefono_fijo: this.telefono,
      celular: this.celular,
      email: this.email
    };

    this.http.post(url, body, { headers }).subscribe({
      next: (resp: any) => {
        this.showSuccess = true;
        this.showError = false;
        setTimeout(() => this.router.navigate(['/contacts']), 1500);
      },
      error: (error) => {
        this.showError = true;
        this.showSuccess = false;
        this.errorMessage = error.error?.message || 'Error al guardar el contacto';
      }
    });
  }
}