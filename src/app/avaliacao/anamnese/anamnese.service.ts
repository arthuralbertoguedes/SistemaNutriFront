import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../../recursos/url';
import { Observable } from '../../../../node_modules/rxjs';
import { Anamnese } from '../../models/anamnese.model';

@Injectable({
  providedIn: 'root'
})
export class AnamneseService {

  constructor(private http: HttpClient) { }
  url: string = urlBackEnd.api + "/anamnese";

  salvar(objeto): Observable<Object>{
      return this.http.post(this.url + '/salvar', objeto);
  }

  buscarPorId(id: Number): Observable<Anamnese>{ 
      return this.http.get<Anamnese>(this.url + `/${id}`);
  }
}
