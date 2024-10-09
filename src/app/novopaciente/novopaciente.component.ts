import { Component } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  
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
      queixa: new FormControl<string>('', Validators.required),
      historiadoenca: new FormControl<string>('', Validators.required),
      historiapatologica: new FormControl<string>('', Validators.required),
      habitos: new FormControl<string>('', Validators.required),
      historiafamiliar: new FormControl<string>('', Validators.required),
      examesComplementares: new FormControl<string>('', Validators.required),
      examefisico: new FormControl<string>('', Validators.required),
      diagnosticoFisio: new FormControl<string>('', Validators.required),
      proagnosticoFisio: new FormControl<string>('', Validators.required),
      quantidade: new FormControl<string>('', Validators.required),
      plano: new FormControl<string>('', Validators.required),
  });

  constructor(private pacienteService: PacienteService) { }

  salvar() {
    console.log(this.form.value)
    if (this.form.valid) {
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

          // Enviar dados da ficha de anamnese
          const fichaAnamneseData = {
            pacienteId: response.id, // Usando o ID do paciente recém-criado
            queixa: formValues.queixa,
            historiaDoencaAtual: formValues.historiadoenca,
            historiaPatologica: formValues.historiapatologica,
            habitosVida: formValues.habitos,
            historiaFamiliar: formValues.historiafamiliar,
          };

          this.pacienteService.salvarFichaAnamnese(fichaAnamneseData).subscribe({
            next: (fichaResponse) => {
              console.log('Ficha de Anamnese salva com sucesso:', fichaResponse);
            },
            error: (error) => {
              console.error('Erro ao salvar ficha de anamnese:', error);
            }
          });

          // Enviar dados dos exames
          const examesData = {
            pacienteId: response.id, // Usando o ID do paciente recém-criado
            examesComplementares: formValues.examesComplementares,
            exameFisico: formValues.examefisico,
          };

          this.pacienteService.salvarExames(examesData).subscribe({
            next: (examesResponse) => {
              console.log('Exames salvos com sucesso:', examesResponse);
            },
            error: (error) => {
              console.error('Erro ao salvar exames:', error);
            }
          });

          // Enviar dados do diagnóstico prognóstico
          const diagnosticoData = {
            pacienteId: response.id, // Usando o ID do paciente recém-criado
            diagnosticoFisio: formValues.diagnosticoFisio,
            prognosticoFisio: formValues.proagnosticoFisio,
          };

          this.pacienteService.salvarDiagnosticoPrognostico(diagnosticoData).subscribe({
            next: (diagnosticoResponse) => {
              console.log('Diagnóstico e prognóstico salvos com sucesso:', diagnosticoResponse);
            },
            error: (error) => {
              console.error('Erro ao salvar diagnóstico e prognóstico:', error);
            }
          });

          // Enviar dados do tratamento proposto
          const tratamentoData = {
            pacienteId: response.id, // Usando o ID do paciente recém-criado
            quantidade: formValues.quantidade,
            plano: formValues.plano,
          };

          this.pacienteService.salvarTratamentoProposto(tratamentoData).subscribe({
            next: (tratamentoResponse) => {
              console.log('Tratamento proposto salvo com sucesso:', tratamentoResponse);
            },
            error: (error) => {
              console.error('Erro ao salvar tratamento proposto:', error);
            }
          });

        },
        error: (error) => {
          console.error('Erro ao salvar paciente:', error);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}