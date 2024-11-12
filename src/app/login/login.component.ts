import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  router = inject(Router);

  // Propriedades para armazenar email e senha
  email: string = '';
  password: string = '';
  showPassword: boolean = false; // Controla a visualização da senha

  // Método para verificar credenciais e fazer login
  logar() {
    if (this.email === 'admin@admin.com.br' && this.password === 'admin1234') {
      this.router.navigate(['pacientes']);
    } else {
      alert('Credenciais incorretas'); // Exibe alerta caso as credenciais estejam incorretas
    }
  }
}
