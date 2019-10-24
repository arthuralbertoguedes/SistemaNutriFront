import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Mensagem } from '../models/mensagem.model';
import { Observable } from '../../../node_modules/rxjs';
import { urlBackEnd } from '../recursos/url';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  public url : string = urlBackEnd.api;

  constructor(private http: HttpClient) { }

  public salvarMensagem(mensagem: Mensagem): Observable<Mensagem>{
      return this.http.post<Mensagem>(`${this.url}/mensagem/salvar`, mensagem);
  }

  public buscarMensagens(idPaciente: number, idNutricionista: number): Observable<Mensagem[]>{
    return this.http.get<Mensagem[]>(`${this.url}/mensagem/buscarMensagens/${idPaciente}/${idNutricionista}`);
  }
}
