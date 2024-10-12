import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:5147/api/Paciente';
  private fichaAnamneseUrl = 'http://localhost:5147/api/FichaAnamnese';
  private examesUrl = 'http://localhost:5147/api/Exames';
  private diagnosticoUrl = 'http://localhost:5147/api/DiagnosticoPrognostico';
  private tratamentoUrl = 'http://localhost:5147/api/TratamentoProposto';

  constructor(private http: HttpClient) { }

  salvarPaciente(pacienteData: any): Observable<any> {
    return this.http.post(this.apiUrl, pacienteData).pipe(
      catchError(this.handleError)
    );
  }

  salvarFichaAnamnese(fichaAnamneseData: any): Observable<any> {
    return this.http.post(this.fichaAnamneseUrl, fichaAnamneseData).pipe(
      catchError(this.handleError)
    );
  }

  salvarExames(examesData: any): Observable<any> {
    return this.http.post(this.examesUrl, examesData).pipe(
      catchError(this.handleError)
    );
  }
  salvarDiagnostico(diagnosticoData: any): Observable<any> {
    return this.http.post(this.diagnosticoUrl, diagnosticoData).pipe(
      catchError(this.handleError)
    );
  }
  salvarTratamentoProposto(tratamentoData: any): Observable<any> {
    return this.http.post(this.tratamentoUrl, tratamentoData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(`Erro do servidor: ${error.status}, ` + `corpo do erro: ${error.error}`);
    }
    return throwError('Algo ruim aconteceu; tente novamente mais tarde.');
  }
}
