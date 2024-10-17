import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss'],
})
export class NovopacienteComponent implements OnInit {
  form: FormGroup;
  pacienteId: number | null = null;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = +params['id'];
      if (this.pacienteId) {
        this.carregarPaciente(this.pacienteId);
      }
    });
  }

  salvar() {
    if (this.form.valid) {
      const formValues = this.form.value;
      this.pacienteId ? this.atualizarPaciente(formValues) : this.salvarPaciente(formValues);
    } else {
      console.error('Formulário inválido');
    }
  }

  private salvarPaciente(formValues: any) {
    const pacienteData = this.gerarPacienteData(formValues);

    this.pacienteService.salvarPaciente(pacienteData).subscribe({
      next: (response: any) => {
        console.log('Paciente salvo com sucesso!', response);
        this.router.navigate(['pacientes']);
        this.salvarFichaAnamnese(response.id, formValues);
      },
      error: (error: any) => {
        console.error('Erro ao salvar paciente:', error);
      },
    });
  }

  private atualizarPaciente(formValues: any) {
    // Verifica se pacienteId é null e trata o erro
    if (this.pacienteId === null) {
        console.error('ID do paciente não encontrado');
        return; // ou redirecione, conforme necessário
    }

    // Obtém os dados do paciente pelo ID
    this.pacienteService.getPacientePorId(this.pacienteId).subscribe({
        next: (paciente: any) => {
            if (paciente) {
                // Cria um objeto para atualizar apenas os campos que foram preenchidos
                const pacienteAtualizado = {
                    ...paciente, // Mantém os dados existentes
                    ...this.gerarPacienteData(formValues) // Sobrescreve apenas os dados do formulário preenchidos
                };

                // Chama o serviço para atualizar o paciente
                this.pacienteService.atualizarPaciente(this.pacienteId as number, pacienteAtualizado).subscribe({
                    next: (response: any) => {
                        console.log('Paciente atualizado com sucesso!', response);
                        this.router.navigate(['pacientes']);
                    },
                    error: (error: any) => {
                        console.error('Erro ao atualizar paciente:', error);
                    },
                });
            } else {
                console.warn('Paciente não encontrado');
            }
        },
        error: (error: any) => {
            console.error('Erro ao carregar dados do paciente:', error);
        },
    });
}


private gerarPacienteData(formValues: any) {
  return {
      nome: formValues.nome || undefined,
      dataAvaliacao: formValues.dataAvaliacao ? this.formatarData(formValues.dataAvaliacao) : undefined,
      estadoCivil: formValues.estadoCivil || undefined,
      nacionalidade: formValues.nacionalidade || undefined,
      naturalidade: formValues.naturalidade || undefined,
      dataNascimento: this.formatarData(formValues.dataNascimento), 
      peso: formValues.peso || undefined,
      altura: formValues.altura || undefined,
      endereco: formValues.endereco || undefined,
      numeroIdentidade: formValues.numeroIdentidade || undefined,
      telefone: formValues.telefone || undefined,
      email: formValues.email || undefined,
      profissao: formValues.profissao || undefined,
      diagnosticoClinico: formValues.diagnosticoClinico || undefined,
  };
}



  private formatarData(data: Date | null): string | null {
    if (data) {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      return `${ano}-${mes}-${dia}`;
    }
    return null;
  }

  private carregarPaciente(id: number) {
    this.pacienteService.getPacientePorId(id).subscribe({
      next: (paciente: any) => {
        console.log('Dados do paciente:', paciente);
        if (paciente) {
          this.form.patchValue(paciente);
          console.log('Formulário preenchido com sucesso:', this.form.value);
        } else {
          console.warn('Paciente não encontrado ou dados inválidos');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar dados do paciente:', error);
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
