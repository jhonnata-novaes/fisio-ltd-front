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

  salvar() {
    if (this.form.valid) {
      const formValues = this.form.value;
      if (this.pacienteId) {
        this.atualizarPaciente(formValues);
        this.atualizarFichaAnamnese(formValues);
        this.atualizarExames(formValues);
        this.atualizarDiagnostico(formValues);
        this.atualizarTratamentoProposto(formValues);
      } else {
        this.salvarPaciente(formValues);
      }
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
  private atualizarPaciente(formValues: any) {
    if (this.pacienteId === null) {
      console.error('ID do paciente não encontrado');
      return;
    }

    this.pacienteService.getPacientePorId(this.pacienteId).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          const pacienteAtualizado = {
            ...paciente,
            ...this.gerarPacienteData(formValues),
          };

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

  private atualizarFichaAnamnese(formValues: any) {
    if (this.pacienteId === null) {
      console.error('ID do paciente não encontrado');
      return;
    }

    this.pacienteService.getFichaAnamnesePorId(this.pacienteId).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          const pacienteAtualizado = {
            ...paciente,
            ...this.gerarPacienteData(formValues),
          };

          this.pacienteService.atualizarFichaAnamnese(this.pacienteId as number, pacienteAtualizado).subscribe({
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

  private atualizarExames(formValues: any) {
    if (this.pacienteId === null) {
      console.error('ID do paciente não encontrado');
      return;
    }

    this.pacienteService.getExamesPorId(this.pacienteId).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          const pacienteAtualizado = {
            ...paciente,
            ...this.gerarPacienteData(formValues),
          };

          this.pacienteService.atualizarExames(this.pacienteId as number, pacienteAtualizado).subscribe({
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

  private atualizarDiagnostico(formValues: any) {
    if (this.pacienteId === null) {
      console.error('ID do paciente não encontrado');
      return;
    }

    this.pacienteService.getDiagnosticoPorId(this.pacienteId).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          const pacienteAtualizado = {
            ...paciente,
            ...this.gerarPacienteData(formValues),
          };

          this.pacienteService.atualizarDiagnostico(this.pacienteId as number, pacienteAtualizado).subscribe({
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

  private atualizarTratamentoProposto(formValues: any) {
    if (this.pacienteId === null) {
      console.error('ID do paciente não encontrado');
      return;
    }

    this.pacienteService.getTratamentoPropostoPorId(this.pacienteId).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          const pacienteAtualizado = {
            ...paciente,
            ...this.gerarPacienteData(formValues),
          };

          this.pacienteService.atualizarTratamentoProposto(this.pacienteId as number, pacienteAtualizado).subscribe({
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
      queixa: formValues.queixa || undefined,
      historiaDoencaAtual: formValues.historiadoenca || undefined,
      historiaPatologica: formValues.historiapatologica || undefined,
      habitosVida: formValues.habitos || undefined,
      historiaFamiliar: formValues.historiafamiliar || undefined,
      examesComplementares: formValues.examesComplementares || undefined,
      exameFisico: formValues.examefisico || undefined,
      diagnosticoFisio: formValues.diagnosticoFisio || undefined,
      prognosticoFisio: formValues.proagnosticoFisio || undefined,
      quantidade: formValues.quantidade || undefined,
      plano: formValues.plano || undefined,
    };
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        const idParam = params['id'];
        this.pacienteId = +idParam; // Converte para número

        // Debugging: Verifique o ID recebido
        console.log('ID do paciente recebido:', idParam);
        console.log('ID do paciente após conversão:', this.pacienteId);

        if (!isNaN(this.pacienteId) && this.pacienteId > 0) {
            // Se é um ID válido, carregue os dados do paciente
            this.carregarPaciente(this.pacienteId);
            this.carregarFichaAnamnese(this.pacienteId);
            this.carregarExames(this.pacienteId);
            this.carregarDiagnostico(this.pacienteId);
            this.carregarTratamentoProposto(this.pacienteId);
        } else {
            // Caso contrário, estamos criando um novo paciente
            console.log('Criando um novo paciente');
            // Aqui você pode inicializar os dados do formulário para um novo paciente
        }
    });
}



  private formatarData(data: string | null): string | null {
    if (data) {
      // Cria um objeto Date a partir da string de data
      const date = new Date(data);
  
      if (!isNaN(date.getTime())) { // Verifica se a data é válida
        // Obtém o offset do fuso horário em minutos
        const timezoneOffset = date.getTimezoneOffset() * 60000; // Converte para milissegundos
  
        // Ajusta a data subtraindo o offset do fuso horário
        const adjustedDate = new Date(date.getTime() - timezoneOffset);
  
        // Retorna a data no formato YYYY-MM-DD
        return adjustedDate.toISOString().split('T')[0];
      }
    }
    console.log("GAGAGAGA");
    return null;
    


  }
  
  
  private carregarPaciente(id: number) {
    this.pacienteService.getPacientePorId(id).subscribe({
      next: (paciente: any) => {
        if (paciente) {
          // Atribui os valores ao FormGroup
          this.form.patchValue(paciente);
  
          // Formatar e atribuir a data de nascimento
          const dataNascimentoFormatada = this.formatarData(paciente.dataNascimento);
          this.form.patchValue({
            dataNascimento: dataNascimentoFormatada,
          });
  
          // Formatar e atribuir a data de avaliação
          const dataAvaliacaoFormatada = this.formatarData(paciente.dataAvaliacao);
          this.form.patchValue({
            dataAvaliacao: dataAvaliacaoFormatada,
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
  

  private carregarFichaAnamnese(id: number) {
    this.pacienteService.getFichaAnamnesePorId(id).subscribe({
      next: (ficha: any[]) => { // A resposta é um array, então mantenha o tipo como any[]
        console.log('Dados retornados:', ficha); // Log para visualizar a estrutura
  
        if (ficha && ficha.length > 0) { // Verifica se existe e se não está vazio
          this.form.patchValue({
            queixa: ficha[0].queixa,
            historiadoenca: ficha[0].historiaDoencaAtual, // Corrigido para corresponder ao nome correto
            historiapatologica: ficha[0].historiaPatologica, // Corrigido para corresponder ao nome correto
            habitos: ficha[0].habitosVida, // Corrigido para corresponder ao nome correto
            historiafamiliar: ficha[0].historiaFamiliar // Corrigido para corresponder ao nome correto
          }); 
        } else {
          console.warn('Ficha de Anamnese não encontrada');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar Ficha de Anamnese:', error);
      },
    });
  }
  

  private carregarExames(id: number) {
    this.pacienteService.getExamesPorId(id).subscribe({
      next: (exames: any) => {
        console.log('Dados retornados:', exames);  // Verifique os dados retornados aqui
        if (exames && exames.length > 0) {
          this.form.patchValue({
            examesComplementares: exames[0].examesComplementares,
            examefisico: exames[0].exameFisico
          });
        } else {
          console.warn('Exames não encontrados');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar Exames:', error);
      },
    });
  }

  private carregarDiagnostico(id: number) {
    this.pacienteService.getDiagnosticoPorId(id).subscribe({
      next: (diagnostico: any[]) => {
        console.log('Dados retornados:', diagnostico); // Verifique os dados retornados aqui
        if (diagnostico && diagnostico.length > 0) {
          this.form.patchValue({
            diagnosticoFisio: diagnostico[0].diagnosticoFisio,
            proagnosticoFisio: diagnostico[0].prognosticoFisio, // Certifique-se de que o nome da propriedade está correto
            quantidade: diagnostico[0].quantidade,
          });
        } else {
          console.warn('Diagnóstico não encontrado');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar Diagnóstico:', error);
      },
    });
  }
  

  private carregarTratamentoProposto(id: number) {
    this.pacienteService.getTratamentoPropostoPorId(id).subscribe({
      next: (tratamento: any[]) => { // Mudei para tratamento: any[]
        if (tratamento && tratamento.length > 0) { // Verifica se existe e se não está vazio
          this.form.patchValue({
            plano: tratamento[0].plano, // Acessa o primeiro item do array
          });
        } else {
          console.warn('Tratamento Proposto não encontrado');
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar Tratamento Proposto:', error);
      },
    });
  }
}
