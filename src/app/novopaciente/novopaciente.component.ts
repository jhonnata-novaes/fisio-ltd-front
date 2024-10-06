import { Component } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  // Importar o serviço

// Definindo uma interface para os dados do paciente
interface DadosBasicos {
  nome: string;
  dataAvaliacao: Date;
  estadoCivil: string;
  nacionalidade: string;
  naturalidade: string;
  dataNascimento: Date;
  peso: number;
  altura: number;
  endereco: string;
  numeroIdentidade: string;
  telefone: string;
  email: string;
  profissao: string;
  diagnosticoClinico?: string;
}

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss']
})
export class NovopacienteComponent {
  paciente: DadosBasicos = { // Tipo do paciente definido
    nome: '',
    dataAvaliacao: new Date(),
    estadoCivil: '',
    nacionalidade: '',
    naturalidade: '',
    dataNascimento: new Date(),
    peso: 0,
    altura: 0,
    endereco: '',
    numeroIdentidade: '',
    telefone: '',
    email: '',
    profissao: '',
    diagnosticoClinico: ''
  };

  constructor(private pacienteService: PacienteService) { }

  // Função para verificar se um campo é obrigatório
  private campoObrigatorio(campo: string): boolean {
    return campo.trim() === '';
  }

  // Função para salvar os dados do paciente
  salvarPaciente() {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      this.campoObrigatorio(this.paciente.nome) || 
      this.campoObrigatorio(this.paciente.email) || 
      this.campoObrigatorio(this.paciente.endereco) ||
      this.campoObrigatorio(this.paciente.estadoCivil) || 
      this.campoObrigatorio(this.paciente.nacionalidade) || 
      this.campoObrigatorio(this.paciente.naturalidade) ||
      this.campoObrigatorio(this.paciente.numeroIdentidade) || 
      this.campoObrigatorio(this.paciente.profissao) || 
      this.campoObrigatorio(this.paciente.telefone) || 
      this.paciente.peso <= 0 || 
      this.paciente.altura <= 0 ||
      !this.paciente.dataAvaliacao || 
      !this.paciente.dataNascimento
    ) {
      console.error('Por favor, preencha todos os campos obrigatórios corretamente.');
      return; // Não envia os dados se algum campo estiver vazio ou inválido
    }

    // Se todos os campos obrigatórios estiverem preenchidos
    this.pacienteService.salvarPaciente(this.paciente).subscribe({
      next: (response) => {
        console.log('Paciente salvo com sucesso', response);
      },
      error: (error) => {
        console.error('Erro ao salvar o paciente', error);
      }
    });
  }
}