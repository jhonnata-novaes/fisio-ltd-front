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

  finalizarTratamento(id: number): Observable<any> {
    const dadosParaEnviar = {
      id: id, // Incluindo o ID no corpo da requisição
      statusTratamento: 'Finalizado', // Somente o status será enviado para atualização
    };

    return this.http
      .put(`${this.tratamentoUrl}/finalizar/${id}`, dadosParaEnviar)
      .pipe(
        tap((response) =>
          console.log('Tratamento finalizado com sucesso:', response)
        ),
        catchError(this.handleError)
      );
  }

  cancelarTratamento(id: number): Observable<any> {
    const dadosParaEnviar = {
      id: id, // Incluindo o ID no corpo da requisição
      statusTratamento: 'Cancelado',
    };
    return this.http
      .put(`${this.tratamentoUrl}/cancelado/${id}`, dadosParaEnviar)
      .pipe(
        tap((response) =>
          console.log('Tratamento cancelado com sucesso:', response)
        ),
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
    console.log('Buscando paciente com ID:', id);
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getFichaAnamnesePorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.log('ID do paciente:', id);
      console.error('ID inválido para getFichaAnamnesePorId:', id);
      return throwError('ID inválido para obter ficha anamnese.');
    }
    console.log('Buscando ficha anamnese com ID:', id);
    return this.http
      .get<any>(`${this.fichaAnamneseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getExamesPorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getExamesPorId:', id);
      return throwError('ID inválido para obter exames.');
    }
    console.log('Buscando exames com ID:', id);
    return this.http
      .get<any>(`${this.examesUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getDiagnosticoPorId(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error('ID inválido para getDiagnosticoPorId:', id);
      return throwError('ID inválido para obter diagnóstico.');
    }
    console.log('Buscando diagnóstico com ID:', id);
    return this.http
      .get<any>(`${this.diagnosticoUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTratamentoPropostoPorId(id: number): Observable<any> {
    console.log('ID recebido:', id);
    if (!id || isNaN(id)) {
      console.error('ID inválido para getTratamentoPropostoPorId:', id);
      return throwError(
        () => new Error('ID inválido para obter tratamento proposto.')
      );
    }
    console.log('Buscando tratamento proposto com ID:', id);
    return this.http.get<any>(`${this.tratamentoUrl}/${id}`).pipe(
      tap((data) => {
        console.log('Resposta da API:', data); // Verifique a resposta da API
      }),
      catchError(this.handleError)
    );
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
