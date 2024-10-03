import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient
import { Observable } from 'rxjs';  // Para usar o Observable

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:5147/api/Paciente';

  constructor(private http: HttpClient) { }

  // Método para enviar os dados do novo paciente para a API
  salvarPaciente(pacienteData: any): Observable<any> {
    return this.http.post(this.apiUrl, pacienteData);
  }
}
