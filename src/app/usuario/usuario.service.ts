import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { urlBackEnd } from '../recursos/url';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public url : string = urlBackEnd.api;

  constructor(private http: HttpClient) { }

  buscarUsuario(): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.url}/usuario/buscarUsuario`);
  }
}
