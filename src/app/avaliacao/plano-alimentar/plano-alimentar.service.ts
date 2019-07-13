import { Injectable } from '@angular/core';
import { Alimento } from './alimento.model';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { urlBackEnd } from '../../recursos/url';
import { map } from '../../../../node_modules/rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanoAlimentarService {

  url: string = urlBackEnd.api + "/alimento";

  constructor(private http: HttpClient) { }



  listarAlimentos(pesquisa: String){
      return this.http.get<Observable<Alimento[]>>(this.url + '/listarTodos/' + pesquisa)
          .pipe(
                map(res=> res)
          )
  }
}
