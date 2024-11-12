import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service'; // Ajuste o caminho conforme necessário

// Definindo a interface para o modelo de paciente
export interface Paciente {
  id: number;
  nome: string;
  status: 'EM_TRATAMENTO' | 'TRATAMENTO_FINALIZADO' | 'TRATAMENTO_CANCELADO';
  // Outros campos que você achar necessário
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'], // Corrigido de styleUrl para styleUrls
})
export class PacientesComponent implements OnInit {
  router = inject(Router);
  pacientes: Paciente[] = []; // Agora a lista de pacientes é do tipo Paciente
  errorMessage: string = ''; // Inicializando como string vazia

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.obterPacientes(); // Chama o método ao inicializar o componente
  }

  cadastrar() {
    this.router.navigate(['novopaciente']); // Navega para a tela de cadastro de novos pacientes
  }

  visualizarPaciente(id: number) {
    this.router.navigate(['editarpaciente', id]); // Navega para a tela de edição passando o ID do paciente
  }

  // Método para obter pacientes
  obterPacientes() {
    this.pacienteService.buscarPacientes().subscribe({
      next: (data) => {
        this.pacientes = data; // Armazena os pacientes recebidos
        this.errorMessage = ''; // Reseta a mensagem de erro se a busca for bem-sucedida
      },
      error: (error) => {
        console.error('Erro ao buscar pacientes', error);
        this.errorMessage =
          'Não foi possível carregar a lista de pacientes. Tente novamente mais tarde.'; // Mensagem de erro
      },
    });
  }

  // Método para finalizar tratamento de um paciente
  finalizarTratamento(id: number): void {
    this.pacienteService.finalizarTratamento(id).subscribe({
      next: (response) => {
        console.log(
          'Tratamento finalizado com sucesso para o paciente de ID:',
          id
        );
        this.obterPacientes(); // Recarrega a lista de pacientes após finalizar o tratamento
      },
      error: (error) => {
        console.error(
          'Erro ao finalizar o tratamento para o paciente de ID:',
          id,
          error
        );
      },
    });
  }
}
