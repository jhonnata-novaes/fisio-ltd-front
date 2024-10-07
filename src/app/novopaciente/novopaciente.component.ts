import { Component } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  // Importar o serviço
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Definindo uma interface para os dados do paciente
// interface DadosBasicos {
//   nome: string;
//   dataAvaliacao: Date;
//   estadoCivil: string;
//   nacionalidade: string;
//   naturalidade: string;
//   dataNascimento: Date;
//   peso: number;
//   altura: number;
//   endereco: string;
//   numeroIdentidade: string;
//   telefone: string;
//   email: string;
//   profissao: string;
//   diagnosticoClinico?: string;
// }

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss']
})
export class NovopacienteComponent {
  
  form = new FormGroup({
    nome: new FormControl<string>('', Validators.required),
    dataAvaliacao: new FormControl<string>('', Validators.required),
    estadoCivil: new FormControl<string>('', Validators.required),
    nacionalidade: new FormControl<string>('', Validators.required),
    naturalidade: new FormControl<string>('', Validators.required),
    dataNascimento: new FormControl<string>('', Validators.required),
    peso: new FormControl<string>('', Validators.required),
    altura: new FormControl<string>('', Validators.required),
    endereco: new FormControl<string>('', Validators.required),
    numeroIdentidade: new FormControl<string>('', Validators.required),
    telefone: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    profissao: new FormControl<string>('', Validators.required),
    diagnosticoClinico: new FormControl<string>('', Validators.required),
  });
  // paciente: DadosBasicos = { // Tipo do paciente definido
  //   nome: '',
  //   dataAvaliacao: new Date(),
  //   estadoCivil: '',
  //   nacionalidade: '',
  //   naturalidade: '',
  //   dataNascimento: new Date(),
  //   peso: 0,
  //   altura: 0,
  //   endereco: '',
  //   numeroIdentidade: '',
  //   telefone: '',
  //   email: '',
  //   profissao: '',
  //   diagnosticoClinico: ''
  // };

  constructor(private pacienteService: PacienteService) { }

  // // Função para verificar se um campo é obrigatório
  // private campoObrigatorio(campo: string): boolean {
  //   return campo.trim() === '';
  // }

  // Função para salvar os dados do paciente
  
  salvar(){
    console.log(this.form.value);
  }
}