import { Injectable } from '@angular/core';
import { Lembrete } from '../models/lembrete.model';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../recursos/url';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LembretesService {

  urlApi = urlBackEnd.api;

  constructor(private http: HttpClient) { }
  
  salvar(lembrete: Lembrete): Observable<Lembrete>{
      console.log(lembrete)
      return this.http.post<Lembrete>(`${this.urlApi}/lembrete/salvar`,lembrete);
  }

  buscarLembretesDia(dataDeHoje: Date): Observable<Lembrete[]>{
      let objetoConsulta = {data: dataDeHoje};
      return this.http.post<Lembrete[]>(`${this.urlApi}/lembrete/listarLembretesHoje`, objetoConsulta);
  }
}
