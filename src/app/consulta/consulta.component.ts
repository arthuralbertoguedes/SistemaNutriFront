import { Component, OnInit } from '@angular/core';
import { ConsultaService } from './consulta.service';
import { Consulta } from './consulta.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public listaConsultas: Consulta[];

  constructor(private _consultaService: ConsultaService) {}

  ngOnInit() {

      this._consultaService.listar()
          .subscribe(
                res=>{
                    this.listaConsultas = res;
                }
          )
  }

}
