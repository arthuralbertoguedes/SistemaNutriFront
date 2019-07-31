import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../../recursos/url';
import { Observable } from '../../../../node_modules/rxjs';
import { Antropometria } from '../../models/antropometria.model';

@Injectable({
  providedIn: 'root'
})
export class AntropometriaService {

  constructor(private http: HttpClient) { }
  url: string = urlBackEnd.api + "/antropometria";

  salvar(antropometria): Observable<Object>{
      return this.http.post(this.url + '/salvar', antropometria);
  }
  
  buscarPorIdPaciente(id: Number){
      return this.http.get<Antropometria>(`${this.url}/${id}`)
  }

}