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
  errorMessage: string | null = null; // Propriedade para armazenar mensagens de erro

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
        this.errorMessage = null; // Reseta a mensagem de erro

        // Agora, para cada paciente, buscamos o seu status de tratamento
        this.pacientes.forEach((paciente) => {
          this.pacienteService.getTratamentoPropostoPorId(paciente.id).subscribe(
            (tratamentoData) => {
              // Aqui, assumimos que a resposta tem um array e atribuímos o tratamento correto
              if (tratamentoData && Array.isArray(tratamentoData) && tratamentoData.length > 0) {
                paciente.statusTratamento = tratamentoData[0].statusTratamento;
              } else {
                paciente.statusTratamento = "Não informado"; // Caso não tenha tratamento
              }
            },
            (error) => {
              console.error('Erro ao buscar o tratamento para o paciente', paciente.id, error);
              paciente.statusTratamento = "Erro ao carregar tratamento"; // Caso ocorra um erro
            }
          );
        });
      },
      error: (error) => {
        console.error('Erro ao buscar pacientes', error);
        this.errorMessage =
          'Não foi possível carregar a lista de pacientes. Tente novamente mais tarde.'; // Mensagem de erro
      },
    });
  }
}
