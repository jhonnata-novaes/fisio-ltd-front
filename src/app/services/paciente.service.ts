import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'http://localhost:5147/api/Paciente';
  private fichaAnamneseUrl = 'http://localhost:5147/api/FichaAnamnese';
  private examesUrl = 'http://localhost:5147/api/Exames';
  private diagnosticoUrl = 'http://localhost:5147/api/DiagnosticoPrognostico';
  private tratamentoUrl = 'http://localhost:5147/api/TratamentoProposto';

  constructor(private http: HttpClient) {}

  salvarPaciente(pacienteData: any): Observable<any> {
    return this.http
      .post(this.apiUrl, pacienteData)
      .pipe(catchError(this.handleError));
  }

  atualizarPaciente(id: number, pacienteData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, pacienteData)
      .pipe(catchError(this.handleError));
  }

  atualizarFichaAnamnese(id: number, pacienteData: any): Observable<any> {
    // Garantir que o ID no corpo seja o mesmo que na URL
    const dadosParaEnviar = {
      ...pacienteData,
      id: id  // Adiciona o ID no corpo da requisição
    };

    return this.http.put(`${this.fichaAnamneseUrl}/${id}`, dadosParaEnviar).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  atualizarExames(id: number, pacienteData: any): Observable<any> {
    // Garantir que o ID no corpo seja o mesmo que na URL
    const dadosParaEnviar = {
      ...pacienteData,
      id: id  // Adiciona o ID no corpo da requisição
    };
  
    return this.http.put(`${this.examesUrl}/${id}`, dadosParaEnviar).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }
  
  atualizarDiagnostico(id: number, pacienteData: any): Observable<any> {
    // Garantir que o ID no corpo seja o mesmo que na URL
    const dadosParaEnviar = {
      ...pacienteData,
      id: id  // Adiciona o ID no corpo da requisição
    };
  
    return this.http.put(`${this.diagnosticoUrl}/${id}`, dadosParaEnviar).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }
  
  atualizarTratamentoProposto(id: number, pacienteData: any): Observable<any> {
    // Garantir que o ID no corpo seja o mesmo que na URL
    const dadosParaEnviar = {
      ...pacienteData,
      id: id  // Adiciona o ID no corpo da requisição
    };
  
    return this.http.put(`${this.tratamentoUrl}/${id}`, dadosParaEnviar).pipe(
      tap(response => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }
  salvarFichaAnamnese(fichaAnamneseData: any): Observable<any> {
    return this.http
      .post(this.fichaAnamneseUrl, fichaAnamneseData)
      .pipe(catchError(this.handleError));
  }

  salvarExames(examesData: any): Observable<any> {
    return this.http
      .post(this.examesUrl, examesData)
      .pipe(catchError(this.handleError));
  }

  salvarDiagnostico(diagnosticoData: any): Observable<any> {
    return this.http
      .post(this.diagnosticoUrl, diagnosticoData)
      .pipe(catchError(this.handleError));
  }

  salvarTratamentoProposto(tratamentoData: any): Observable<any> {
    return this.http
      .post(this.tratamentoUrl, tratamentoData)
      .pipe(catchError(this.handleError));
  }

  buscarPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }
  
  getPacientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
  
  getFichaAnamnesePorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5147/api/FichaAnamnese/${id}`);
  }
  
  getExamesPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5147/api/Exames/${id}`);
  }
  
  getDiagnosticoPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5147/api/DiagnosticoPrognostico/${id}`);
  }
  
  getTratamentoPropostoPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5147/api/TratamentoProposto/${id}`);
  }
  
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(
        `Erro do servidor: ${error.status}, ` + `corpo do erro: ${error.error}`
      );
    }
    return throwError('Algo ruim aconteceu; tente novamente mais tarde.');
  }
}
