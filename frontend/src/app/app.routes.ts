import { Routes } from '@angular/router'; 
import { Login } from './login/login';
import { Register } from './register/register';
import { Contacts } from './contacts/contacts';
import {Register_usr} from './register-usr/register-usr';


export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'contacts', component: Contacts },
    {path: 'register-usr', component: Register_usr}

];
