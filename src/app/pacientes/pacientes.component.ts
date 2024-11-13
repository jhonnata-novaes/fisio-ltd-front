import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  router = inject(Router);
  pacientes: any[] = []; // Propriedade para armazenar a lista de pacientes
  tratamento: any; // Propriedade para armazenar o tratamento
  errorMessage: string | null = null; // Propriedade para armazenar mensagens de erro

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.obterPacientes(); // Chama o método ao inicializar o componente
    const tratamentoId = 1; // Defina o ID do tratamento que deseja buscar

    this.pacienteService.getTratamentoPropostoPorId(tratamentoId).subscribe(
      (data) => {
        console.log('Tratamento finalizado com sucesso:', data);
        if (data && Array.isArray(data) && data.length > 0) {
          // Aqui estamos atribuindo o primeiro item do array diretamente
          this.tratamento = data[0];
          console.log('Tratamento recebido:', this.tratamento);
        } else {
          this.tratamento = null;
          console.log('Nenhum tratamento encontrado.');
        }
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar o tratamento.';
        console.error('Erro ao buscar o tratamento:', error);
      }
    );
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
        this.errorMessage = null; // Reseta a mensagem de erro se a busca for bem-sucedida
      },
      error: (error) => {
        console.error('Erro ao buscar pacientes', error);
        this.errorMessage =
          'Não foi possível carregar a lista de pacientes. Tente novamente mais tarde.'; // Mensagem de erro
      },
    });
  }
}
