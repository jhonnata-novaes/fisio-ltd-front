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

  atualizarPaciente(id: number, pacienteData: any): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para atualizarPaciente:', id);
      return throwError('ID inválido para atualizar o paciente.');
    }
    return this.http
      .put(`${this.apiUrl}/${id}`, pacienteData)
      .pipe(catchError(this.handleError));
  }

  atualizarFichaAnamnese(id: number, pacienteData: any): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para atualizarFichaAnamnese:', id);
      return throwError('ID inválido para atualizar a ficha anamnese.');
    }
    const dadosParaEnviar = {
      ...pacienteData,
      id: id,
    };

    return this.http
      .put(`${this.fichaAnamneseUrl}/${id}`, dadosParaEnviar)
      .pipe(
        tap((response) => console.log('Resposta do servidor:', response)),
        catchError(this.handleError)
      );
  }

  atualizarExames(id: number, pacienteData: any): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para atualizarExames:', id);
      return throwError('ID inválido para atualizar exames.');
    }
    const dadosParaEnviar = {
      ...pacienteData,
      id: id,
    };

    return this.http.put(`${this.examesUrl}/${id}`, dadosParaEnviar).pipe(
      tap((response) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  atualizarDiagnostico(id: number, pacienteData: any): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para atualizarDiagnostico:', id);
      return throwError('ID inválido para atualizar diagnóstico.');
    }
    const dadosParaEnviar = {
      ...pacienteData,
      id: id,
    };

    return this.http.put(`${this.diagnosticoUrl}/${id}`, dadosParaEnviar).pipe(
      tap((response) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  atualizarTratamentoProposto(id: number, pacienteData: any): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para atualizarTratamentoProposto:', id);
      return throwError('ID inválido para atualizar tratamento proposto.');
    }
    const dadosParaEnviar = {
      ...pacienteData,
      id: id,
    };

    return this.http.put(`${this.tratamentoUrl}/${id}`, dadosParaEnviar).pipe(
      tap((response) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  buscarPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getPacientePorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getPacientePorId:', id);
      return throwError('ID inválido para obter paciente.');
    }
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFichaAnamnesePorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getFichaAnamnesePorId:', id);
      return throwError('ID inválido para obter ficha anamnese.');
    }
    return this.http
      .get<any>(`${this.fichaAnamneseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getExamesPorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getExamesPorId:', id);
      return throwError('ID inválido para obter exames.');
    }
    return this.http
      .get<any>(`${this.examesUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getDiagnosticoPorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getDiagnosticoPorId:', id);
      return throwError('ID inválido para obter diagnóstico.');
    }
    return this.http
      .get<any>(`${this.diagnosticoUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTratamentoPropostoPorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getTratamentoPropostoPorId:', id);
      return throwError('ID inválido para obter tratamento proposto.');
    }
    return this.http
      .get<any>(`${this.tratamentoUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  finalizarTratamento(pacienteId: number): Observable<any> {
    const url = `http://localhost:5147/api/Paciente/${pacienteId}/finalizarTratamento`; // Alterei para usar pacienteId
    return this.http.put(url, {}).pipe(
      catchError(this.handleError),
      tap((response) => {
        console.log('Tratamento finalizado com sucesso:', response);
        // Aqui você pode fazer alguma lógica adicional, como atualizar o status do paciente ou emitir eventos
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código de erro: ${error.status}, Mensagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
