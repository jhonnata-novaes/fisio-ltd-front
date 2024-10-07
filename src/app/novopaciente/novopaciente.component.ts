import { Component } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  // Importar o serviço
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss']
})
export class NovopacienteComponent {

  form = new FormGroup({
    nome: new FormControl<string>('', Validators.required),
    dataAvaliacao: new FormControl<Date | null>(null, Validators.required),
    estadoCivil: new FormControl<string>('', Validators.required),
    nacionalidade: new FormControl<string>('', Validators.required),
    naturalidade: new FormControl<string>('', Validators.required),
    dataNascimento: new FormControl<Date | null>(null, Validators.required),
    peso: new FormControl<string>('', Validators.required),
    altura: new FormControl<string>('', Validators.required),
    endereco: new FormControl<string>('', Validators.required),
    numeroIdentidade: new FormControl<string>('', Validators.required),
    telefone: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    profissao: new FormControl<string>('', Validators.required),
    diagnosticoClinico: new FormControl<string>('', Validators.required),
  });

  constructor(private pacienteService: PacienteService) { }

  salvar() {
    if (this.form.valid) {  // Verifica se o formulário é válido
      const formValues = this.form.value;

      // Convertendo a data de nascimento e data de avaliação para UTC
      const dataNascimento = formValues.dataNascimento ? new Date(formValues.dataNascimento) : null;
      const dataAvaliacao = formValues.dataAvaliacao ? new Date(formValues.dataAvaliacao) : null;

      const pacienteData = {
        ...formValues,
        dataNascimento: dataNascimento ? new Date(Date.UTC(dataNascimento.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate())) : null,
        dataAvaliacao: dataAvaliacao ? new Date(Date.UTC(dataAvaliacao.getFullYear(), dataAvaliacao.getMonth(), dataAvaliacao.getDate())) : null
      };

      // Envia os dados para o serviço para salvar o paciente
      this.pacienteService.salvarPaciente(pacienteData).subscribe({
        next: (response) => {
          console.log('Paciente salvo com sucesso:', response);
          // Aqui você pode adicionar lógica adicional como redirecionar ou mostrar uma mensagem de sucesso
        },
        error: (error) => {
          console.error('Erro ao salvar paciente:', error);
          // Lógica de tratamento de erro, como mostrar uma mensagem ao usuário
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
