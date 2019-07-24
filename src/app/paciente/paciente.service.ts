import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { map } from 'rxjs/operators';
import { urlBackEnd } from '../recursos/url';
import { Paciente } from './Paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  public url : string = urlBackEnd.api;
  constructor(private http : HttpClient) {}

  public salvar(paciente : Object){
    return this.http.post(this.url+"/paciente/salvar",paciente)
    .pipe(
       map(res=>res)
    )
  }

  public listarTodos(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(this.url+"/paciente/listarTodos")
      .pipe(
          map(resposta=>{
            return resposta;
          })
      )
  }

  public listarPorNome(nomePaciente: string): Observable<Paciente[]>{
      return this.http.get<Paciente[]>(this.url + "/paciente/listarPorNome/" + nomePaciente );
  }

  public listarUltimosCadastros(): Observable<Paciente[]>{
      return this.http.get<Paciente[]>(this.url + "/paciente/listarUltimos");
  }

  public listarPorId(id: Number): Observable<Paciente>{
      return this.http.get<Paciente>(this.url + `/paciente/${id}` );
  }

}
