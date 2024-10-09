import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:5147/api/Paciente';  // URL do controller de Dados Básicos
  private fichaAnamneseUrl = 'http://localhost:5147/api/FichaAnamnese'; // URL do controller de Ficha Anamnese
  private examesUrl = 'http://localhost:5147/api/Exames'; // URL do controller de Exames
  private diagnosticoPrognosticoUrl = 'http://localhost:5147/api/DiagnosticoPrognostico'; // URL do controller de Diagnóstico Prognóstico
  private tratamentoPropostoUrl = 'http://localhost:5147/api/TratamentoProposto'; // URL do controller de Tratamento Proposto

  constructor(private http: HttpClient) { }

  // Método para enviar os dados do novo paciente para a API
  salvarPaciente(pacienteData: any): Observable<any> {
    return this.http.post(this.apiUrl, pacienteData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para enviar os dados da ficha de anamnese para a API
  salvarFichaAnamnese(fichaAnamneseData: any): Observable<any> {
    return this.http.post(this.fichaAnamneseUrl, fichaAnamneseData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para enviar os dados dos exames para a API
  salvarExames(examesData: any): Observable<any> {
    return this.http.post(this.examesUrl, examesData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para enviar os dados do diagnóstico prognóstico para a API
  salvarDiagnosticoPrognostico(diagnosticoData: any): Observable<any> {
    return this.http.post(this.diagnosticoPrognosticoUrl, diagnosticoData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para enviar os dados do tratamento proposto para a API
  salvarTratamentoProposto(tratamentoData: any): Observable<any> {
    return this.http.post(this.tratamentoPropostoUrl, tratamentoData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para tratar erros
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(`Erro do servidor: ${error.status}, ` + `corpo do erro: ${error.error}`);
    }
    return throwError('Algo ruim aconteceu; tente novamente mais tarde.');
  }
}
