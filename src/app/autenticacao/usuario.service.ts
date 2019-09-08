import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { urlBackEnd } from '../recursos/url';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Login } from '../models/login.model';
import { catchError, map } from '../../../node_modules/rxjs/operators';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  
  public url : string = urlBackEnd.api;

  constructor(private http: HttpClient) { }

  buscarUsuario(login: Login): Observable<Token>{
      return this.http.post<Token>(`${this.url}/logar/autenticar`,login);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(`${this.url}/usuario/salvar`, usuario);
    
  }
}
