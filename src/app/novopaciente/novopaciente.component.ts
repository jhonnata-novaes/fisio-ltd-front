import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss'],
})
export class NovopacienteComponent {
  form: FormGroup;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {
    // Injetar Router
    this.form = new FormGroup({
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
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
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
  }

  salvar() {
    if (this.form.valid) {
      const formValues = this.form.value;

      this.salvarPaciente(formValues);
    } else {
      console.error('Formulário inválido');
    }
  }

  private salvarPaciente(formValues: any) {
    const pacienteData = {
      nome: formValues.nome,
      dataAvaliacao: formValues.dataAvaliacao,
      estadoCivil: formValues.estadoCivil,
      nacionalidade: formValues.nacionalidade,
      naturalidade: formValues.naturalidade,
      dataNascimento: formValues.dataNascimento,
      peso: formValues.peso,
      altura: formValues.altura,
      endereco: formValues.endereco,
      numeroIdentidade: formValues.numeroIdentidade,
      telefone: formValues.telefone,
      email: formValues.email,
      profissao: formValues.profissao,
      diagnosticoClinico: formValues.diagnosticoClinico,
    };

    this.pacienteService.salvarPaciente(pacienteData).subscribe({
      next: (response: any) => {
        console.log('Paciente salvo com sucesso!', response);

        // Após salvar o paciente, redirecionar para a lista de pacientes
        this.router.navigate(['pacientes']); // Ajuste a rota conforme necessário

        this.salvarFichaAnamnese(response.id, formValues);
      },
      error: (error: any) => {
        console.error('Erro ao salvar paciente:', error);
      },
    });
  }

  private salvarFichaAnamnese(pacienteId: number, formValues: any) {
    const fichaAnamneseData = {
      dadosBasicosId: pacienteId,
      queixa: formValues.queixa,
      historiaDoencaAtual: formValues.historiadoenca,
      historiaPatologica: formValues.historiapatologica,
      habitosVida: formValues.habitos,
      historiaFamiliar: formValues.historiafamiliar,
    };

    this.pacienteService.salvarFichaAnamnese(fichaAnamneseData).subscribe({
      next: (examesResponse: any) => {
        console.log('Ficha de anamnese salva com sucesso!', examesResponse);

        this.salvarExames(pacienteId, formValues);
      },
      error: (examesError: any) => {
        console.error('Erro ao salvar ficha de anamnese:', examesError);
      },
    });
  }

  private salvarExames(pacienteId: number, formValues: any) {
    const examesData = {
      dadosBasicosId: pacienteId,
      examesComplementares: formValues.examesComplementares,
      examefisico: formValues.examefisico,
    };

    this.pacienteService.salvarExames(examesData).subscribe({
      next: (examesResponse: any) => {
        console.log('Exames salvos com sucesso!', examesResponse);
        this.salvarDiagnostico(pacienteId, formValues);
      },
      error: (examesError: any) => {
        console.error('Erro ao salvar exames:', examesError);
      },
    });
  }

  private salvarDiagnostico(pacienteId: number, formValues: any) {
    const diagnosticoData = {
      dadosBasicosId: pacienteId,
      diagnosticoFisio: formValues.diagnosticoFisio,
      prognosticofisio: formValues.proagnosticoFisio,
      quantidade: formValues.quantidade,
    };

    this.pacienteService.salvarDiagnostico(diagnosticoData).subscribe({
      next: (diagnosticoResponse: any) => {
        console.log('Diagnostico salvo com sucesso!', diagnosticoResponse);
        this.salvarTratamentoProposto(pacienteId, formValues);
      },
      error: (diagnosticoError: any) => {
        console.error('Erro ao salvar diagnostico:', diagnosticoError);
      },
    });
  }

  private salvarTratamentoProposto(pacienteId: number, formValues: any) {
    const tratamentoData = {
      dadosBasicosId: pacienteId,
      plano: formValues.plano,
    };

    this.pacienteService.salvarTratamentoProposto(tratamentoData).subscribe({
      next: (tratamentoResponse: any) => {
        console.log('Tratamento salvo com sucesso!', tratamentoResponse);
      },
      error: (tratamentoError: any) => {
        console.error('Erro ao salvar tratamento:', tratamentoError);
      },
    });
  }
}
