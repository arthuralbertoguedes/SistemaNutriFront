import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../recursos/url';
import { Consulta } from './consulta.model';
import { Observable } from '../../../node_modules/rxjs';
import { map, catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  public url : string = urlBackEnd.api;

  constructor(private http: HttpClient) { }

  public salvarConsulta(consulta: Consulta): Observable<Consulta>{
    let endPoint = this.url+"/consulta/salvar";
     
     return this.http.post<Consulta>(endPoint,consulta)
        .pipe(
            map(res=>res),
        )
  }

  public listar(): Observable<Consulta[]>{
      return this.http.get(this.url + "/consulta/listar")
          .pipe(
              map(res => res as Consulta[])
          );
  }

  public buscarConsultaPorNomePaciente(objetoConsulta: Object): Observable<Consulta[]>{
      return this.http.post<Consulta[]>(this.url + `/consulta/listarPorNomePaciente`, objetoConsulta);
  }
  
  public cancelarConsulta(id: number): any{
      return this.http.get(this.url + "/consulta/cancelar/" + id);
  }
}
