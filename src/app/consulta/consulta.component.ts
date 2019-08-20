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
  public pesquisa: string = "";

  constructor(private _consultaService: ConsultaService) {}

  ngOnInit() {

      this._consultaService.listar()
          .subscribe(
                res=>{
                    this.listaConsultas = res;
                    console.log(res);
                }
          )
  }

  public pesquisarConsulta(): void{
      let nomePaciente;
      if(this.pesquisa == "")
         nomePaciente = "flagListarTodos";
      else
         nomePaciente = this.pesquisa;

      this._consultaService.buscarConsultaPorNomePaciente(nomePaciente)  
        .subscribe(res => {
            this.listaConsultas = res;
        })
  }

  public cancelarConsulta(consulta: Consulta): void{
      this._consultaService.cancelarConsulta(Number(consulta.id))
        .subscribe(res => {
            alert('Consulta cancelada com sucesso');
            this.pesquisarConsulta();
        })
  }
}
