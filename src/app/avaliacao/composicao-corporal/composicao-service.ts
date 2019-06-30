import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../../recursos/url';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoService {

  constructor(private http: HttpClient) { }
  url: string = urlBackEnd.api + "/composicao-corporal";

  salvar(composicao): Observable<Object>{
      return this.http.post(this.url + '/salvar', composicao);
  }
}