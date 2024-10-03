import { Component } from '@angular/core';
import { PacienteService } from '../services/paciente.service';  // Importar o serviço

@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.component.html',
  styleUrls: ['./novopaciente.component.scss']
})
export class NovopacienteComponent {
  paciente: any = {};  // Objeto para armazenar os dados do formulário

  constructor(private pacienteService: PacienteService) { }

  // Função para salvar os dados do paciente
  salvarPaciente() {
    this.pacienteService.salvarPaciente(this.paciente).subscribe({
      next: (response) => console.log('Paciente salvo com sucesso', response),
      error: (error) => console.error('Erro ao salvar o paciente', error)
    });
    
  }
}
