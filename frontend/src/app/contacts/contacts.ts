import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Contacto {
  _id: string;
  telefono_fijo: string;
  nombre: string;
  apellidos: string;
  email: string;
  celular: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'], 
  imports: [CommonModule, FormsModule]
})
export class Contacts implements OnInit {
  contacts: Contacto[] = [];
  userEmail: string = '';
  editingIndex: number | null = null;
  editedContact: Partial<Contacto> = {};
  showError = false;
  errorMessage = '';
  showSuccess = false;
  successMessage = '';
  searchText: string = '';


constructor(private http: HttpClient, private router: Router) { }
  goToNewContact() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
    var session = sessionStorage.getItem('token');
    if (!session || session.trim() === '') {
      this.router.navigate(['/login']);
      return;
    }
    this.userEmail = sessionStorage.getItem('user_email') || '';
    this.getContacts();
  }

  getContacts() {
    var token = sessionStorage.getItem('token');
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });

    this.http.get<Contacto[]>('http://localhost:6545/api/contact', { headers }).subscribe({
      next: (data: Contacto[]) => {
        this.contacts = data;
      },
      error: () => {
        this.showError = true;
        this.errorMessage = 'Error al obtener los contactos';
      }
    });
  }
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  startEdit(index: number, contact: Contacto) {
  this.editingIndex = index;
  this.editedContact = { ...contact };
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedContact = {};
  }

  saveEdit(contactId: string, index: number) {
    var token = sessionStorage.getItem('token');
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
    this.http.put(`http://localhost:6545/api/contact/${contactId}`, this.editedContact, { headers }).subscribe({
      next: (resp: any) => {
        this.contacts[index] = { ...this.contacts[index], ...this.editedContact };
        this.showSuccess = true;
        this.successMessage = 'Contacto actualizado correctamente';
        this.cancelEdit();
        setTimeout(() => (this.showSuccess = false), 2000);
      },
      error: () => {
        this.showError = true;
        this.errorMessage = 'Error al actualizar el contacto';
        setTimeout(() => (this.showError = false), 2000);
      }
    });
  }
    deleteContact(contactId: string, index: number) {
      if (!confirm('¿Seguro que deseas eliminar este contacto?')) return;
      var token = sessionStorage.getItem('token');
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      });
      this.http.delete(`http://localhost:6545/api/contact/${contactId}`, { headers }).subscribe({
        next: () => {
          this.contacts = this.contacts.filter((c) => c._id !== contactId);
          this.showSuccess = true;
          this.successMessage = 'Contacto eliminado correctamente';
          setTimeout(() => (this.showSuccess = false), 2000);
        },
        error: () => {
          this.showError = true;
          this.errorMessage = 'Error al eliminar el contacto';
          setTimeout(() => (this.showError = false), 2000);
        }
      });
    }

    get filteredContacts(): Contacto[] {
      if (!this.searchText.trim()) return this.contacts;
      const text = this.searchText.trim().toLowerCase();
      return this.contacts.filter(c =>
        c.nombre.toLowerCase().includes(text) ||
        c.apellidos.toLowerCase().includes(text) ||
        c.email.toLowerCase().includes(text) ||
        c.celular.toLowerCase().includes(text) ||
        c.telefono_fijo.toLowerCase().includes(text)
      );
    }
}
