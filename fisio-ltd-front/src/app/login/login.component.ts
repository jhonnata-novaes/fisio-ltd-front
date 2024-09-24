import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onSubmit() {
    console.log('Formulário enviado');
    alert('Login realizado com sucesso! Seja bem vindo(a)!')
  }
}