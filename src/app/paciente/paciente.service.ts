import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { map } from 'rxjs/operators';
import { urlBackEnd } from '../recursos/url';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  public url : string = urlBackEnd.api;
  constructor(private http : HttpClient) {}

  public teste() : Observable<any>{
    //return this.http.get<any>("http://localhost:4200/api/paciente");
    return this.http.get<any>(this.url + "/paciente")
    .pipe(
       map((res)=>{return res.nome})
    );
  }

  public salvar(){
    return this.http.post(this.url+"/paciente/salvar",{nome: "José Ferreira"})
    .pipe(
       map(res=>res)
    )
  }


}
