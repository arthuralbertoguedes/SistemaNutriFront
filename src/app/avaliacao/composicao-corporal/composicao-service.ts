import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../../recursos/url';
import { Observable } from '../../../../node_modules/rxjs';
import { ComposicaoCorporal } from '../../models/composicao-corporal.model';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoService {

  constructor(private http: HttpClient) { }
  url: string = urlBackEnd.api + "/composicao-corporal";

  salvar(composicao): Observable<Object>{
      return this.http.post(this.url + '/salvar', composicao);
  }

  buscarPorIdPaciente(id: Number): Observable<ComposicaoCorporal>{
      return this.http.get<ComposicaoCorporal>(`${this.url}/${id}`);
  }
}